import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { AwsS3Service } from 'src/aws/services';
import { SearchQueryDTO } from '../common/dto/searchquery.dto';
import { IUser } from '../user/interfaces';
import { CategoryDTO, CreateCategoryDTO, UpdateCategoryDTO } from './dto';
import { ICategory, IPaginatedCategory } from './interfaces';

/**
 * Category Service
 */
@Injectable()
export class CategoryService {
  private AWS_SERVICE_IMG_FOLDER = 'CategoryImage';
  /**
   * Constructor
   * @param {Model<ICategory>} categoryModel,
   * @param {Service<AwsS3Service>} awsFileService
   */
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<ICategory>,
    private readonly awsFileService: AwsS3Service,
  ) {}

  /**
   * Create category
   * @param {IUser} user
   * @param {CreateCategoryDTO} createCategoryDto
   * @returns {Promise<ICategory>}
   */
  create(
    user: IUser,
    createCategoryDto: CreateCategoryDTO,
  ): Promise<ICategory> {
    try {
      const categoryDTO = new CategoryDTO();
      categoryDTO.nameSlug = createCategoryDto.name
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
        6,
      );
      categoryDTO.slug = slug();
      categoryDTO.cBy = user._id;
      const setCategory = { ...createCategoryDto, ...categoryDTO };
      const registerDoc = new this.categoryModel(setCategory);
      return registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update category
   * @param {string} id
   * @param {UpdateCategoryDTO} updateCategoryDto
   * @param {IUser} user
   * @param files
   * @returns {Promise<ICategory>}
   */
  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDTO,
    files: {
      logo?: Express.Multer.File[];
      pictures?: Express.Multer.File[];
      videos?: Express.Multer.File[];
    },
    user: IUser,
  ): Promise<ICategory> {
    try {
      const category = await this.categoryModel.findOne({ _id: id });
      if (!category) {
        return Promise.reject(
          new NotFoundException('Could not find category.'),
        );
      }
      const categoryDTO = new CategoryDTO();
      if (files) {
        if (files && files.logo) {
          const uploadRes = await this.awsFileService.uploadToS3(
            files.logo[0],
            this.AWS_SERVICE_IMG_FOLDER,
          );
          categoryDTO.logo = uploadRes.Location;
        }

        if (files && files.pictures) {
          categoryDTO.pictures = await Promise.all(
            files.pictures.map(async (picture) => {
              const uploadRes = await this.awsFileService.uploadToS3(
                picture,
                this.AWS_SERVICE_IMG_FOLDER,
              );
              return uploadRes.Location;
            }),
          );
        }
      } else {
        if (
          updateCategoryDto &&
          updateCategoryDto.hasOwnProperty('name') &&
          updateCategoryDto.name
        ) {
          categoryDTO.nameSlug = updateCategoryDto.name
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/['"<>@+?.,\/#!$%&;:{}=`~()]/g, '')
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '');
        }

        const slug = customAlphabet(
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890',
          6,
        );
        categoryDTO.slug = slug();
      }

      categoryDTO.uBy = user._id;
      const setCategory = { ...updateCategoryDto, ...categoryDTO };
      return await category.set(setCategory).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * find category by id
   * @param {string} id
   * @returns {Promise<ICategory>}
   */
  async findOne(id: string): Promise<ICategory> {
    try {
      const category = await this.categoryModel.findOne({ _id: id }).exec();
      if (!category) {
        return Promise.reject(
          new NotFoundException('Could not find category.'),
        );
      }
      return category;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Fetches categories
   * @returns {Promise<IPaginatedCategory>}
   */
  public async findAll(query: SearchQueryDTO): Promise<IPaginatedCategory> {
    try {
      const searchQuery: any = {
        isActive: true,
        isDeleted: false,
      };

      if (query.hasOwnProperty('noCondition') && query.noCondition === true) {
        delete searchQuery.isActive;
        delete searchQuery.isDeleted;
      }

      if (query.hasOwnProperty('type')) {
        searchQuery.type = query.type;
      }

      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const data = await this.categoryModel
        .find(searchQuery)
        .limit(limit)
        .skip(skip)
        .sort('name ASC');

      const result: IPaginatedCategory = {
        data,
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.categoryModel.countDocuments(searchQuery),
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
