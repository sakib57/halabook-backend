import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchQueryDTO } from 'src/common/dto/searchquery.dto';
import { IUser } from '../../user/interfaces';
import { VoucherDTO, CreateVoucherDTO, UpdateVoucherDTO } from '../dto';
import { IPaginatedVoucher } from '../interfaces/pagination.interface';
import { IVoucher } from '../interfaces/voucher.interface';

/**
 * Voucher Service
 */
@Injectable()
export class VoucherService {
  /**
   * Constructor
   * @param {Model<IVoucher>} voucherModel,
   */
  constructor(
    @InjectModel('Voucher')
    private readonly voucherModel: Model<IVoucher>,
  ) {}

  /**
   * Create voucher
   * @param {IUser} user
   * @param {CreateVoucherDTO} cVoucherDTO
   * @returns {Promise<IVoucher>}
   */
  create(user: IUser, cVoucherDTO: CreateVoucherDTO): Promise<IVoucher> {
    try {
      const voucherDTO = new VoucherDTO();
      voucherDTO.cBy = user._id;
      const setVoucher = { ...cVoucherDTO, ...voucherDTO };
      const registerDoc = new this.voucherModel(setVoucher);
      return registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit voucher
   * @param {string} id
   * @param {UpdateVoucherDTO} uVoucherDTO
   * @param {IUser} user
   * @returns {Promise<ISchedule>} mutated voucher data
   */
  async update(
    id: string,
    uVoucherDTO: UpdateVoucherDTO,
    user: IUser,
  ): Promise<IVoucher> {
    try {
      const voucher = await this.voucherModel.findOne({ _id: id });
      if (!voucher) {
        return Promise.reject(new NotFoundException('Could not find voucher.'));
      }
      const voucherDTO = new VoucherDTO();
      voucherDTO.uBy = user._id;
      voucherDTO.uTime = Date.now();
      const setVoucher = { ...uVoucherDTO, ...voucherDTO };

      return voucher.set(setVoucher).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Voucher List
   * @returns {Promise<IPaginatedVoucher>}
   */
  async findAll(query: SearchQueryDTO): Promise<IPaginatedVoucher> {
    try {
      const searchQuery: any = {
        isActive: true,
        isDeleted: false,
      };

      if (query.hasOwnProperty('noCondition') && query.noCondition === true) {
        delete searchQuery.isActive;
        delete searchQuery.isDeleted;
      }

      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;
      const data = await this.voucherModel
        .find(searchQuery)
        .limit(limit)
        .skip(skip)
        .sort('name ASC');
      const result: IPaginatedVoucher = {
        data,
      };
      if (query.pagination) {
        result.pagination = {
          total: await this.voucherModel.countDocuments(searchQuery),
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
