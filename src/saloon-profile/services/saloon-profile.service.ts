import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { AwsS3Service } from '../../aws/services';
import { MerchantService } from './merchant.service';
import { IUser } from '../../user/interfaces';
import {
  CreateSProfileDTO,
  SaloonProfileDTO,
  UpdateSProfileDTO,
} from '../dto/saloon-profile';
import { CreateMerchantDTO } from '../dto/merchant';
import { IMerchant, IPaginateSProfile, ISProfile } from '../interfaces';
import {
  subDocUpdateWithArray,
  subDocUpdateWithObj,
} from '../../common/utils/helper';
import { Status } from '../../common/mock/constant.mock';
import { SearchQueryDTO } from '../../common/dto/searchquery.dto';

@Injectable()
export class SaloonProfileService {
  private readonly AWS_SERVICE_IMG_FOLDER = 'SaloonImage';
  /**
   * Constructor
   * @param {Model<ISProfile>} sProfileModel
   * @param {Model<IMerchant>} sProviderModel
   * @param {Service<MerchantService>} merchantService
   * @param {Service<AwsS3Service>} awsFileService
   */
  constructor(
    @InjectModel('SaloonProfile')
    private readonly sProfileModel: Model<ISProfile>,
    @InjectModel('Merchant')
    private readonly sProviderModel: Model<IMerchant>,
    private readonly merchantService: MerchantService,
    private readonly awsFileService: AwsS3Service,
  ) {}

  /**
   * Create Saloon Profile
   * @param {IUser} user
   * @param {CreateSProfileDTO} createSProfileDTO
   * @returns {Promise<ISProfile>}
   */
  async create(
    user: IUser,
    createSProfileDTO: CreateSProfileDTO,
  ): Promise<ISProfile> {
    try {
      const serviceProfileDTO = new SaloonProfileDTO();
      serviceProfileDTO.nameSlug = createSProfileDTO.name
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/['"<>@+?.,\/#!$%&;:{}=`~()]/g, '')
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '');
      const slug = customAlphabet(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890',
        8,
      );
      serviceProfileDTO.slug = slug();

      if (
        createSProfileDTO &&
        createSProfileDTO.hasOwnProperty('location') &&
        createSProfileDTO.location.lng &&
        createSProfileDTO.location.lng
      ) {
        createSProfileDTO.location.type = 'Point';
        createSProfileDTO.location.coordinates = [
          createSProfileDTO.location.lat,
          createSProfileDTO.location.lng,
        ];
      }

      serviceProfileDTO.cBy = user._id;
      serviceProfileDTO.profilePercentage = 25;
      const setServiceProfile = {
        ...createSProfileDTO,
        ...serviceProfileDTO,
      };
      const registerDoc = new this.sProfileModel(setServiceProfile);
      const saloonProfile = await registerDoc.save();

      const merchantDTO = new CreateMerchantDTO();
      merchantDTO.merchant = user && user._id;
      merchantDTO.saloonProfile = saloonProfile._id;
      merchantDTO.status = Status.JOINED;
      merchantDTO['isActive'] = true;
      merchantDTO['isAdmin'] = true;
      merchantDTO['isOwner'] = true;
      await this.merchantService.create(user, merchantDTO);
      return saloonProfile;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit Saloon profile
   * @param {string} id
   * @param {UpdateSProfileDTO} updateSProfileDTO
   * @param files
   * @param {IUser} user
   * @returns {Promise<ISProfile>}
   */
  async update(
    id: string,
    updateSProfileDTO: UpdateSProfileDTO,
    files: {
      thumbnail?: Express.Multer.File[];
      pictures?: Express.Multer.File[];
      videos?: Express.Multer.File[];
    },
    user: IUser,
  ): Promise<ISProfile> {
    try {
      const saloonProfile = await this.sProfileModel.findOne({ _id: id });

      if (!saloonProfile) {
        return Promise.reject(
          new NotFoundException('Could not find saloon-profile.'),
        );
      }

      const saloonProfileDTO = new SaloonProfileDTO();

      if (files) {
        if (files && files.thumbnail) {
          const uploadRes = await this.awsFileService.uploadToS3(
            files.thumbnail[0],
            this.AWS_SERVICE_IMG_FOLDER,
          );
          saloonProfileDTO.thumbnail = uploadRes.Location;
        }

        if (files && files.pictures) {
          saloonProfileDTO.pictures = await Promise.all(
            files.pictures.map(async (picture) => {
              const uploadRes = await this.awsFileService.uploadToS3(
                picture,
                this.AWS_SERVICE_IMG_FOLDER,
              );
              return uploadRes.Location;
            }),
          );
        }

        if (files && files.videos) {
          saloonProfileDTO.videos = await Promise.all(
            files.videos.map(async (video) => {
              const uploadRes = await this.awsFileService.uploadToS3(
                video,
                this.AWS_SERVICE_IMG_FOLDER,
              );
              return uploadRes.Location;
            }),
          );
        }
      } else {
        if (
          updateSProfileDTO &&
          updateSProfileDTO.hasOwnProperty('name') &&
          updateSProfileDTO.name
        ) {
          saloonProfileDTO.nameSlug = updateSProfileDTO.name
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/['"<>@+?.,\/#!$%&;:{}=`~()]/g, '')
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '');
        }

        if (updateSProfileDTO && updateSProfileDTO.hasOwnProperty('location')) {
          if (
            updateSProfileDTO.location.lng &&
            updateSProfileDTO.location.lng
          ) {
            updateSProfileDTO.location.type = 'Point';
            updateSProfileDTO.location.coordinates = [
              updateSProfileDTO.location.lat,
              updateSProfileDTO.location.lng,
            ];
          }
        }

        // if (updateSProfileDTO && updateSProfileDTO.hasOwnProperty('services')) {
        //   const saloonServices = saloonProfile.get('services') || [];
        //   saloonProfileDTO.services = subDocUpdateWithArray(
        //     saloonServices,
        //     updateSProfileDTO.services,
        //   );
        // }

        if (updateSProfileDTO && updateSProfileDTO.hasOwnProperty('mobile')) {
          const serviceMobile = saloonProfile.get('mobile') || {};
          saloonProfileDTO.mobile = subDocUpdateWithObj(
            serviceMobile,
            updateSProfileDTO.mobile,
          );
        }

        // if (
        //   updateSProfileDTO &&
        //   updateSProfileDTO.hasOwnProperty('compensations')
        // ) {
        //   const serviceCompensation = saloonProfile.get('compensations') || [];
        //   saloonProfileDTO.compensations = subDocUpdateWithArray(
        //     serviceCompensation,
        //     updateSProfileDTO.compensations,
        //   );
        // }

        if (
          updateSProfileDTO &&
          updateSProfileDTO.hasOwnProperty('workSchedules')
        ) {
          const serviceWorkSchedules = saloonProfile.get('workSchedules') || [];
          saloonProfileDTO.workSchedules = subDocUpdateWithArray(
            serviceWorkSchedules,
            updateSProfileDTO.workSchedules,
          );
        }

        if (updateSProfileDTO && updateSProfileDTO.hasOwnProperty('socials')) {
          const serviceSocials = saloonProfile.get('socials') || [];
          saloonProfileDTO.socials = subDocUpdateWithArray(
            serviceSocials,
            updateSProfileDTO.socials,
          );
        }
      }

      saloonProfileDTO.uBy = user._id;
      saloonProfileDTO.uTime = Date.now();
      const setSaloonProfile = {
        ...updateSProfileDTO,
        ...saloonProfileDTO,
      };

      return await saloonProfile.set(setSaloonProfile).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find One Saloon Profile
   * @param {string} slug
   * @returns {Promise<ISProfile>}
   */
  async findOne(slug: string) {
    try {
      const saloonProfile = await this.sProfileModel
        .findOne({ slug: slug })
        .populate({
          path: 'location.city',
          model: 'City',
          select: { _id: 1, name: 1 },
        })
        .populate({
          path: 'location.state',
          model: 'State',
          select: { _id: 1, name: 1 },
        })
        .populate({
          path: 'location.country',
          model: 'Country',
          select: { _id: 1, name: 1 },
        })
        .populate({
          path: 'categories',
          select: {
            name: 1,
            slug: 1,
            type: 1,
          },
        })
        // .populate({
        //   path: 'services.category',
        //   select: {
        //     name: 1,
        //     slug: 1,
        //     type: 1,
        //   },
        // })
        .populate({
          path: 'merchants',
          select: {
            _id: 1,
            merchant: 1,
            isPaid: 1,
            status: 1,
            workSchedules: 1,
            isAdmin: 1,
            isOwner: 1,
          },
          populate: {
            path: 'merchant',
            populate: {
              path: 'profile',
              select: {
                _id: 1,
                firstName: 1,
                middleName: 1,
                lastName: 1,
                profilePic: 1,
              },
            },
          },
        });
      if (!saloonProfile) {
        return Promise.reject(new NotFoundException('Could not find saloon.'));
      }
      return saloonProfile;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find All Saloon Profile
   * @returns {Promise<IPaginateSProfile>}
   */
  async findAll(query: SearchQueryDTO): Promise<IPaginateSProfile> {
    try {
      let sortQuery: any = { $natural: -1 };
      const searchQuery: any = {
        isActive: true,
        isDeleted: false,
      };
      if (query.hasOwnProperty('name')) {
        searchQuery.name = { $regex: query.name, $options: 'i' };
      }
      if (query.hasOwnProperty('isActive')) {
        searchQuery.isActive = query.isActive;
      }
      if (query.hasOwnProperty('isVerified')) {
        searchQuery.isVerified = query.isVerified;
      }
      if (query.hasOwnProperty('city') && query.city) {
        searchQuery['location.city'] = query.city;
      }
      if (query.hasOwnProperty('state') && query.state) {
        searchQuery['location.state'] = query.state;
      }
      if (query.hasOwnProperty('notIn')) {
        searchQuery['_id'] = {
          $nin: query.notIn,
        };
      }
      if (query.hasOwnProperty('categories')) {
        searchQuery.categories = {
          $in: query.categories,
        };
      }
      if (query.hasOwnProperty('service')) {
        searchQuery['services.name'] = { $regex: query.service, $options: 'i' };
      }
      if (
        query.hasOwnProperty('distance') &&
        query.hasOwnProperty('lat') &&
        query.hasOwnProperty('lng')
      ) {
        sortQuery = '';
        searchQuery['location.coordinates'] = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [query.lat, query.lng],
            },
            $maxDistance: query.distance,
            $minDistance: 0,
          },
        };
      }
      if (query.hasOwnProperty('noCondition') && query.noCondition === true) {
        delete searchQuery.isActive;
        delete searchQuery.isDeleted;
      }
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const data = await this.sProfileModel
        .find(searchQuery)
        .populate({
          path: 'location.city',
          model: 'City',
          select: { _id: 1, name: 1 },
        })
        .populate({
          path: 'location.state',
          model: 'State',
          select: { _id: 1, name: 1 },
        })
        .populate({
          path: 'location.country',
          model: 'Country',
          select: { _id: 1, name: 1 },
        })
        .populate({
          path: 'categories',
          select: {
            name: 1,
            slug: 1,
            type: 1,
          },
        })
        // .populate({
        //   path: 'services.category',
        //   select: {
        //     name: 1,
        //     slug: 1,
        //     type: 1,
        //   },
        // })
        .populate({
          path: 'merchants',
          select: {
            _id: 1,
            merchant: 1,
            isPaid: 1,
            status: 1,
            workSchedules: 1,
            isAdmin: 1,
            isOwner: 1,
          },
          populate: {
            path: 'merchant',
            populate: {
              path: 'profile',
              select: {
                _id: 1,
                firstName: 1,
                middleName: 1,
                lastName: 1,
                profilePic: 1,
              },
            },
          },
        })
        .limit(limit)
        .skip(skip)
        .sort(sortQuery);

      const result: IPaginateSProfile = {
        data,
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.sProfileModel.countDocuments(searchQuery),
          limit,
          skip,
        };
      }
      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
