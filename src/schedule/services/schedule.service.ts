import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../../user/interfaces';
import { ScheduleDTO, CreateScheduleDTO, UpdateScheduleDTO } from '../dto';
import { ISchedule } from '../interfaces/schedule.interface';
import { SearchQueryDTO } from '../../common/dto/searchquery.dto';

/**
 * Schedule Service
 */
@Injectable()
export class ScheduleService {
  /**
   * Constructor
   * @param {Model<ISchedule>} scheduleModel
   */
  constructor(
    @InjectModel('Schedule')
    private readonly scheduleModel: Model<ISchedule>,
  ) {}

  /**
   * Create schedule
   * @param {IUser} user
   * @param {CreateScheduleDTO} cScheduleDTO
   * @returns {Promise<ISchedule>}
   */
  create(user: IUser, cScheduleDTO: CreateScheduleDTO): Promise<ISchedule> {
    try {
      const scheduleDTO = new ScheduleDTO();
      scheduleDTO.user = cScheduleDTO?.user || user._id;
      scheduleDTO.cBy = cScheduleDTO.user;
      const setSchedule = { ...cScheduleDTO, ...scheduleDTO };
      const registerDoc = new this.scheduleModel(setSchedule);
      return registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit schedule
   * @param {string} id
   * @param {UpdateScheduleDTO} uScheduleDTO
   * @param {IUser} user
   * @returns {Promise<ISchedule>} mutated schedule data
   */
  async update(
    id: string,
    uScheduleDTO: UpdateScheduleDTO,
    user: IUser,
  ): Promise<ISchedule> {
    try {
      const schedule = await this.scheduleModel.findOne({ _id: id });
      if (!schedule) {
        return Promise.reject(
          new NotFoundException('Could not find schedule.'),
        );
      }
      const scheduleDTO = new ScheduleDTO();
      scheduleDTO.uBy = user._id;
      scheduleDTO.uTime = Date.now();
      const setSchedule = { ...uScheduleDTO, ...scheduleDTO };

      return schedule.set(setSchedule).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * delete schedule
   * @param {string} id
   * @returns {Promise<ISchedule>}
   */
  async delete(id: string) {
    try {
      const schedule = await this.scheduleModel.deleteOne({ _id: id });
      if (schedule['ok'] === 1 && schedule['n'] > 0) {
        return {
          data: '',
          message: 'Removed successfully',
        };
      } else
        return {
          data: '',
          message: 'Data is already removed',
        };
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Fetches schedule
   * @returns {Promise<ISchedule[]>}
   */
  findAll(query: SearchQueryDTO): Promise<ISchedule[]> {
    try {
      const searchQuery: any = {
        date: {
          $gte: Date.now(),
        },
      };

      query.hasOwnProperty('user') &&
        query.user &&
        (searchQuery.user = query.user);

      query.hasOwnProperty('status') &&
        query.status &&
        (searchQuery.status = query.status);

      if (query.hasOwnProperty('noCondition') && query.noCondition === true) {
        delete searchQuery.date;
      }

      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      return this.scheduleModel
        .find(searchQuery)
        .limit(limit)
        .skip(skip)
        .sort('date ASC')
        .exec();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
