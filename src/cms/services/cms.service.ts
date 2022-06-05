import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AwsS3Service } from 'src/aws/services';
import { ICms } from '../interfaces/cms.interface';
import { Model } from 'mongoose';
import { IUser } from 'src/user/interfaces';
import { CmsDTO } from '../dto/cms.dto';
import {
  subDocUpdateWithArray,
  subDocUpdateWithObj,
} from 'src/common/utils/helper';
import { SearchQueryDTO } from 'src/common/dto/searchquery.dto';

@Injectable()
export class CmsService {
  private AWS_SERVICE_IMG_FOLDER = 'CmsImage';
  /**
   * Constructor
   * @param {Model<ICms>} cmsModel,
   * @param {Service<AwsS3Service>} awsFileService
   */
  constructor(
    @InjectModel('Cms')
    private readonly cmsModel: Model<ICms>,
    private readonly awsFileService: AwsS3Service,
  ) {}

  /**
   * Create cms
   * @param {IUser} user
   * @param {CmsDTO} cmsDto
   * @returns {Promise<ICategory>}
   */
  async create(user: IUser, cmsDto: CmsDTO): Promise<ICms> {
    try {
      const cms = await this.cmsModel.findOne();
      if (!cms) {
        cmsDto.cBy = user._id;
        const registerDoc = new this.cmsModel(cmsDto);
        return registerDoc.save();
      } else {
        return Promise.reject(new NotAcceptableException(`Data already exist`));
      }
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update cms
   * @param id
   * @param files
   * @param {IUser} user
   * @param {CmsDTO} cmsDto
   * @returns {Promise<ICms>}
   */
  async update(
    id: string,
    cmsDto: CmsDTO,
    files: {
      images?: Express.Multer.File[];
      videos?: Express.Multer.File[];
    },
    user: IUser,
  ): Promise<ICms> {
    try {
      const cms = await this.cmsModel.findOne({ _id: id });
      if (cmsDto && cmsDto.hasOwnProperty('banners')) {
        const serviceBanners = cms.get('banners') || [];
        cmsDto.banners = subDocUpdateWithArray(serviceBanners, cmsDto.banners);
      }

      if (cmsDto && cmsDto.hasOwnProperty('mobileApp')) {
        const serviceMobileApp = cms.get('mobileApp') || {};
        cmsDto.mobileApp = subDocUpdateWithObj(
          serviceMobileApp,
          cmsDto.mobileApp,
        );
      }

      if (cmsDto && cmsDto.hasOwnProperty('business')) {
        const serviceBusiness = cms.get('business') || {};
        cmsDto.business = subDocUpdateWithObj(serviceBusiness, cmsDto.business);
      }

      if (cmsDto && cmsDto.hasOwnProperty('aboutUs')) {
        const serviceAboutUs = cms.get('aboutUs') || {};
        cmsDto.aboutUs = subDocUpdateWithObj(serviceAboutUs, cmsDto.aboutUs);
      }

      if (cmsDto && cmsDto.hasOwnProperty('whyUs')) {
        const serviceWhyUs = cms.get('whyUs') || {};
        cmsDto.whyUs = subDocUpdateWithObj(serviceWhyUs, cmsDto.whyUs);
      }

      if (cmsDto && cmsDto.hasOwnProperty('testimonials')) {
        const serviceTestimonials = cms.get('testimonials') || [];
        cmsDto.testimonials = subDocUpdateWithArray(
          serviceTestimonials,
          cmsDto.testimonials,
        );
      }

      if (cmsDto && cmsDto.hasOwnProperty('subscription')) {
        const serviceSubscription = cms.get('subscription') || {};
        cmsDto.subscription = subDocUpdateWithObj(
          serviceSubscription,
          cmsDto.subscription,
        );
      }

      if (cmsDto && cmsDto.hasOwnProperty('footer')) {
        const serviceFooter = cms.get('footer') || {};
        cmsDto.footer = subDocUpdateWithObj(serviceFooter, cmsDto.footer);
      }

      cmsDto.uBy = user._id;
      return await cms.set(cmsDto).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * find cms
   * @returns {Promise<ICms[]>}
   */
  async findAll(query: SearchQueryDTO): Promise<ICms[]> {
    try {
      return await this.cmsModel.find(query).exec();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
