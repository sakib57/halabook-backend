import {
  HttpException,
  HttpStatus,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status } from '../../common/mock/constant.mock';
import { IUser } from '../../user/interfaces';
import {
  CreateMerchantDTO,
  UpdateMerchantDTO,
  MerchantDTO,
} from '../dto/merchant';
import { IMerchant } from '../interfaces';
import { SearchQueryDTO } from '../../common/dto/searchquery.dto';
import { subDocUpdateWithArray } from '../../common/utils/helper';
import { IPaginateMerchant } from '../interfaces/merchant-paginate.interface';

export class MerchantService {
  /**
   * Constructor
   * @param {Model<IMerchant>} merchantModel
   * @param {Model<IUser>} userModel
   */
  constructor(
    @InjectModel('Merchant')
    private readonly merchantModel: Model<IMerchant>,
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  /**
   * Create service provider
   * @param {IUser} user
   * @param {CreateMerchantDTO} createMerchantDTO
   * @returns {Promise<IMerchant>}
   */
  async create(
    user: IUser,
    createMerchantDTO: CreateMerchantDTO,
  ): Promise<IMerchant> {
    try {
      const merchantDTO = new MerchantDTO();
      merchantDTO.cBy = user._id;

      if (
        createMerchantDTO.hasOwnProperty('email') &&
        createMerchantDTO.email
      ) {
        const email = createMerchantDTO.email.toLowerCase();
        const user = await this.userModel.findOne({
          email: email,
        });
        if (user) {
          createMerchantDTO.merchant = user._id;
        } else {
          // Need to email the user to create his account in halabook and then join the saloon profile
          return Promise.reject(
            new NotAcceptableException(`${email} does not have any account.`),
          );
        }
      }

      const setMerchant = { ...createMerchantDTO, ...merchantDTO };
      const registerDoc = new this.merchantModel(setMerchant);
      return registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit service provider
   * @param {string} id
   * @param {IUser} user
   * @param {UpdateMerchantDTO} updateMerchantDTO
   * @returns {Promise<IMerchant>}
   */
  async update(
    id: string,
    user: IUser,
    updateMerchantDTO: UpdateMerchantDTO,
  ): Promise<IMerchant> {
    try {
      if (updateMerchantDTO.hasOwnProperty('merchant')) {
        return Promise.reject(
          new NotAcceptableException("Merchant can't be changed"),
        );
      }

      if (updateMerchantDTO.hasOwnProperty('saloonProfile')) {
        return Promise.reject(
          new NotAcceptableException("Saloon-profile can't be changed"),
        );
      }

      const merchant = await this.merchantModel.findOne({
        _id: id,
      });

      if (!merchant) {
        return Promise.reject(
          new NotFoundException('Could not find the record.'),
        );
      }

      if (
        updateMerchantDTO.hasOwnProperty('isDeleted') &&
        updateMerchantDTO.isDeleted
      ) {
        if (merchant.isOwner === true || merchant.isAdmin === true) {
          return Promise.reject(
            new NotAcceptableException("Admin or owner can't be deleted"),
          );
        } else {
          updateMerchantDTO.isActive = false;
        }
      }

      if (
        updateMerchantDTO.hasOwnProperty('status') &&
        updateMerchantDTO.status &&
        updateMerchantDTO.status === Status.JOINED
      ) {
        updateMerchantDTO.isActive = true;
      }

      const merchantDTO = new MerchantDTO();
      merchantDTO.uTime = Date.now();
      merchantDTO.uBy = user && user._id;

      // if (
      //   updateMerchantDTO.hasOwnProperty('services') &&
      //   updateMerchantDTO.services
      // ) {
      //   const sProviderServices = merchant.get('services') || [];
      //   merchantDTO.services = subDocUpdateWithArray(
      //     sProviderServices,
      //     updateMerchantDTO.services,
      //   );
      // }

      if (
        updateMerchantDTO.hasOwnProperty('workSchedules') &&
        updateMerchantDTO.workSchedules
      ) {
        const sProviderWorkSchedules = merchant.get('workSchedules') || [];
        merchantDTO.workSchedules = subDocUpdateWithArray(
          sProviderWorkSchedules,
          updateMerchantDTO.workSchedules,
        );
      }

      const setMerchant = {
        ...updateMerchantDTO,
        ...merchantDTO,
      };

      return await merchant.set(setMerchant).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Fetches all merchant of saloon-profile
   * @returns {Promise<IPaginateMerchant} queried user data
   */
  public async findAllMerchant(
    saloonId: string,
    query: SearchQueryDTO,
  ): Promise<IPaginateMerchant> {
    try {
      const searchQuery: any = {
        saloonProfile: saloonId,
        isDeleted: false,
      };

      if (query.hasOwnProperty('noCondition') && query.noCondition === true) {
        delete searchQuery.isDeleted;
      }
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;
      const data = await this.merchantModel
        .find(searchQuery)
        .populate({
          path: 'merchant',
          populate: {
            path: 'profile',
          },
        })
        .populate({
          path: 'saloonProfile',
          populate: {
            path: 'merchants',
          },
        })
        .populate({
          path: 'saloonProfile',
          populate: {
            path: 'reviews',
          },
        })
        .populate('services')
        .limit(limit)
        .skip(skip)
        .sort('name ASC');

      const result: IPaginateMerchant = {
        data,
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.merchantModel.countDocuments(searchQuery),
          limit,
          skip,
        };
      }
      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Fetches all saloon-profiles of a provider
   * @returns {Promise<IMerchant[]} queried user data
   */
  public async findAllProfile(
    merchantId: string,
    query: SearchQueryDTO,
  ): Promise<IMerchant[]> {
    try {
      const searchQuery: any = {
        merchant: merchantId,
        isDeleted: false,
      };

      if (query.hasOwnProperty('noCondition') && query.noCondition === true) {
        delete searchQuery.isDeleted;
      }
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;
      return await this.merchantModel
        .find(searchQuery, { uTime: 0, cBy: 0, cTime: 0 })
        .populate('merchant')
        .populate({
          path: 'saloonProfile',
          populate: [
            {
              path: 'categories',
              model: 'Category',
            },
          ],
        })
        .limit(limit)
        .skip(skip)
        .sort('name ASC')
        .exec();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
