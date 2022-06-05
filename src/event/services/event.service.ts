import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../../user/interfaces';
import { EventDTO, CreateEventDTO, UpdateEventDTO } from '../dto';
import { IEvent } from '../interfaces/event.interface';
import { SearchQueryDTO } from '../../common/dto/searchquery.dto';
import { IPaginatedEvent } from '../interfaces/pagination.interface';

/**
 * Event Service
 */
@Injectable()
export class EventService {
  /**
   * Constructor
   * @param {Model<IEvent>} eventModel
   */
  constructor(
    @InjectModel('Event')
    private readonly eventModel: Model<IEvent>,
  ) {}

  /**
   * Create event
   * @param {IUser} user
   * @param {CreateEventDTO} cEventDTO
   * @returns {Promise<IEvent>}
   */
  create(user: IUser, cEventDTO: CreateEventDTO): Promise<IEvent> {
    try {
      const eventDTO = new EventDTO();
      eventDTO.cBy = user._id;
      const setEvent = { ...cEventDTO, ...eventDTO };
      const registerDoc = new this.eventModel(setEvent);
      return registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit event
   * @param {string} id
   * @param {UpdateEventDTO} uEventDTO
   * @param {IUser} user
   * @returns {Promise<IEvent>} mutated event data
   */
  async update(
    id: string,
    uEventDTO: UpdateEventDTO,
    user: IUser,
  ): Promise<IEvent> {
    try {
      const event = await this.eventModel.findOne({ _id: id });
      if (!event) {
        return Promise.reject(
          new NotFoundException('Could not find the event.'),
        );
      }
      const eventDTO = new EventDTO();
      eventDTO.uBy = user._id;
      eventDTO.uTime = Date.now();
      const setEvent = { ...uEventDTO, ...eventDTO };

      return event.set(setEvent).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * delete event
   * @param {string} id
   * @returns {Promise<IEvent>}
   */
  async delete(id: string) {
    try {
      const event = await this.eventModel.deleteOne({ _id: id });
      if (event['ok'] === 1 && event['n'] > 0) {
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
   * Fetches event
   * @returns {Promise<IPaginatedEvent>}
   */
  public async findAll(query: SearchQueryDTO): Promise<IPaginatedEvent> {
    try {
      const searchQuery: any = {
        date: {
          $gte: Date.now(),
        },
      };

      query.hasOwnProperty('saloonProfile') &&
        query.saloonProfile &&
        (searchQuery.saloonProfile = query.saloonProfile);

      query.hasOwnProperty('status') &&
        query.status &&
        (searchQuery.status = query.status);

      if (query.hasOwnProperty('noCondition') && query.noCondition === true) {
        delete searchQuery.date;
      }

      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const data = await this.eventModel
        .find(searchQuery)
        .limit(limit)
        .skip(skip)
        .sort('date ASC')
        .exec();

      const result: IPaginatedEvent = {
        data,
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.eventModel.countDocuments(searchQuery),
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
