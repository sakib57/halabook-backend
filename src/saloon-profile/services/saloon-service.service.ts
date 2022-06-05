import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchQueryDTO } from 'src/common/dto/searchquery.dto';
import { IUser } from 'src/user/interfaces';
import {
  CreateSaloonServiceDTO,
  SaloonServiceDTO,
  UpdateSaloonServiceDTO,
} from '../dto/saloon-service';
import { IPaginateSaloonService } from '../interfaces/s-service-paginate.interface';
import { ISaloonService } from '../interfaces/saloon-service.interface';

@Injectable()
export class SaloonServiceService {
  /**
   * Constructor
   * @param {Model<ISaloonService>} saloonServiceModel
   * @param {Model<IUser>} userModel
   */
  constructor(
    @InjectModel('SaloonService')
    private readonly saloonServiceModel: Model<ISaloonService>,
  ) {}

  /**
   * Create service provider
   * @param {IUser} user
   * @param {CreateSaloonServiceDTO} createSServiceDTO
   * @returns {Promise<IMerchant>}
   */
  async create(
    user: IUser,
    createSServiceDTO: CreateSaloonServiceDTO,
  ): Promise<ISaloonService> {
    try {
      const sServiceDTO = new SaloonServiceDTO();
      sServiceDTO.cBy = user._id;

      const setSService = { ...createSServiceDTO, ...sServiceDTO };
      const registerDoc = new this.saloonServiceModel(setSService);
      return registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Create service provider
   * @param {IUser} user
   * @param {CreateSaloonServiceDTO} createSServiceDTO
   * @returns {Promise<IMerchant>}
   */
  async update(
    id: string,
    user: IUser,
    updateSServiceDTO: UpdateSaloonServiceDTO,
  ): Promise<ISaloonService> {
    try {
      const saloonService = await this.saloonServiceModel.findOne({ _id: id });
      if (!saloonService) {
        return Promise.reject(
          new NotFoundException('Could not find saloon-service.'),
        );
      }
      const sServiceDTO = new SaloonServiceDTO();
      sServiceDTO.uBy = user._id;

      const setSService = { ...updateSServiceDTO, ...sServiceDTO };
      saloonService.set(setSService).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find services by saloon profile
   * @returns {Promise<ISaloonService[]>}
   */
  async findAllBySaloon(
    saloonId: string,
    query: SearchQueryDTO,
  ): Promise<IPaginateSaloonService> {
    try {
      const searchQuery: any = {
        isActive: true,
        isDeleted: false,
      };
      searchQuery.saloonProfile = saloonId;

      if (query.hasOwnProperty('noCondition') && query.noCondition === true) {
        delete searchQuery.isActive;
        delete searchQuery.isDeleted;
      }
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;
      const data = await this.saloonServiceModel
        .find(searchQuery)
        .populate({
          path: 'category',
          select: {
            name: 1,
          },
        })
        .limit(limit)
        .skip(skip);
      const result: IPaginateSaloonService = {
        data,
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.saloonServiceModel.countDocuments(searchQuery),
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
