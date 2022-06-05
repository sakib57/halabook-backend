import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BookingDTO,
  CreateBookingDTO,
  CreateBulkBookingDTO,
  UpdateBookingDTO,
} from '../dto';
import { IUser } from 'src/user/interfaces';
import { IBooking, IPaginatedBooking } from '../interfaces';
import { ScheduleStatus, Status } from 'src/common/mock/constant.mock';
import { ScheduleService } from 'src/schedule/services/schedule.service';
import { CreateScheduleDTO } from 'src/schedule/dto';
import { IMerchant } from 'src/saloon-profile/interfaces';
import { FilterBookingDTO } from '../dto/filter-booking.dto';
import { CreateUserDTO } from 'src/user/dto';
import { UsersService } from 'src/user/services';

/**
 * Booking Service
 */
@Injectable()
export class BookingService {
  /**
   * Constructor
   * @param {Model<IBooking>} bookingModel
   * @param {Model<IMerchant>} merchantModel
   * @param {Model<IUser>} userModel
   * @param {Service<ScheduleService>} scheduleService
   */
  constructor(
    @InjectModel('Booking')
    private readonly bookingModel: Model<IBooking>,
    @InjectModel('Merchant')
    private readonly merchantModel: Model<IMerchant>,
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
    private readonly scheduleService: ScheduleService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Create booking
   * @param {IUser} user
   * @param {CreateBookingDTO} createBookingDto
   * @returns {Promise<IBooking>}
   */
  async create(user: IUser, createBookingDto: CreateBookingDTO) {
    try {
      const bookingDto = new BookingDTO();
      const setBooking = { ...createBookingDto, ...bookingDto };
      //fetch customer
      if (
        createBookingDto?.customer &&
        !isValidObjectId(createBookingDto?.customer)
      ) {
        const customer = await this.userModel.findOne({
          email: createBookingDto.customer,
        });
        if (!customer) {
          const createUserDTO = new CreateUserDTO();
          createUserDTO.email = createBookingDto.customer.toLowerCase();
          createUserDTO.password = Math.random().toString(36).slice(-8);
          createUserDTO.isRegistered = false;
          const newCustomer = await this.usersService.register(createUserDTO);
          setBooking.customer = newCustomer._id;
        } else {
          setBooking.customer = customer._id;
        }
      } else {
        setBooking.customer = user._id;
      }

      const registerDoc = new this.bookingModel(setBooking);
      const booking = registerDoc.save();
      // booking come from saloon
      if (createBookingDto.status === Status.ACCEPTED) {
        const createScheduleDTO = new CreateScheduleDTO();
        createScheduleDTO.date = createBookingDto.requestDate;
        createScheduleDTO.user = createBookingDto.merchant || user._id;
        createScheduleDTO.timeFrom = createBookingDto.requestSlot;
        if (createBookingDto.interval) {
          createScheduleDTO.timeTo =
            createBookingDto.requestSlot + createBookingDto.interval * 3600000;
        } else {
          createScheduleDTO.timeTo = createBookingDto.requestSlot + 3600000;
        }
        createScheduleDTO.status = ScheduleStatus.ALLOCATED;
        this.scheduleService.create(user, createScheduleDTO);
      }
      return booking;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Create bulk booking
   * @param {IUser} user
   * @param {CreateBulkBookingDTO} cBulkBookingDTO
   * @returns {Promise<IBooking[]>}
   */
  async bulkCreate(user: IUser, cBulkBookingDTO: CreateBulkBookingDTO) {
    try {
      const cBookingDTO = new CreateBookingDTO();
      cBookingDTO.saloonProfile = cBulkBookingDTO?.saloonProfile;
      cBookingDTO.status = cBulkBookingDTO?.status;
      cBookingDTO.customer = cBulkBookingDTO?.customer || user._id;

      const result = [];
      if (cBulkBookingDTO && cBulkBookingDTO?.bookings) {
        if (
          Array.isArray(cBulkBookingDTO?.bookings) &&
          cBulkBookingDTO?.bookings.length > 0
        ) {
          cBulkBookingDTO?.bookings.map(async (bookingDTO) => {
            cBookingDTO.merchant = bookingDTO?.merchant;
            cBookingDTO.service = bookingDTO?.service;
            cBookingDTO.requestDate = bookingDTO?.requestDate;
            cBookingDTO.requestSlot = bookingDTO?.requestSlot;
            cBookingDTO.interval = bookingDTO?.interval;
            const res = await this.create(user, cBookingDTO);
            result.push(res);
          });
        }
      }
      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update booking
   * @param {string} id
   * @param {UpdateBookingDTO} updateBookingDto
   * @returns {Promise<IBooking>}
   */
  async update(id: string, updateBookingDto: UpdateBookingDTO, user: IUser) {
    try {
      const booking = await this.bookingModel.findOne({ _id: id });
      if (!booking) {
        return Promise.reject(new NotFoundException('Could not find booking.'));
      }
      const bookingDto = new BookingDTO();
      bookingDto.uTime = Date.now();
      const setBooking = { ...updateBookingDto, ...bookingDto };
      const newBooking = await booking.set(setBooking).save();

      if (updateBookingDto.status === Status.ACCEPTED) {
        const createScheduleDTO = new CreateScheduleDTO();
        createScheduleDTO.date = booking.requestDate;

        createScheduleDTO.user =
          booking.merchant._id || updateBookingDto.merchant;
        createScheduleDTO.timeFrom = booking.requestSlot;
        createScheduleDTO.timeTo =
          updateBookingDto.requestSlot + updateBookingDto.interval * 3600000;
        createScheduleDTO.status = ScheduleStatus.REMOVE;
        this.scheduleService.create(user, createScheduleDTO);
      } else if (
        updateBookingDto.status === Status.RESCHEDULED ||
        updateBookingDto.status === Status.CANCELED
      ) {
        const merchant = this.merchantModel.findOne({
          _id: updateBookingDto.merchant,
        });
        console.log(merchant);
      }
      return newBooking;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find booking by id
   * @param {string} id
   * @returns {Promise<IBooking>}
   */
  async findOne(id: string): Promise<IBooking> {
    try {
      const booking = await this.bookingModel.findOne({ _id: id }).exec();
      if (!booking) {
        return Promise.reject(new NotFoundException('Could not find booking.'));
      }
      return booking;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find booking by id
   * @param {SearchQueryDTO} query
   * @returns {Promise<IPaginatedBooking>}
   */
  async findAll(query: FilterBookingDTO): Promise<IPaginatedBooking> {
    try {
      const searchQuery: any = {
        isActive: true,
        isDeleted: false,
      };

      if (query.hasOwnProperty('noCondition') && query.noCondition === true) {
        delete searchQuery.isActive;
        delete searchQuery.isDeleted;
      }

      if (query.hasOwnProperty('merchants')) {
        searchQuery.merchants = {
          $in: query.merchants,
        };
      }

      if (query.hasOwnProperty('status')) {
        searchQuery.status = query.status;
      }

      if (query.hasOwnProperty('saloonProfile')) {
        searchQuery.saloonProfile = query.saloonProfile;
      } else {
        return Promise.reject(
          new BadRequestException('Saloon Profile ID is required!'),
        );
      }

      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const data = await this.bookingModel
        .find(searchQuery)
        .populate({
          path: 'customer',
          select: {
            _id: 1,
            email: 1,
          },
          populate: {
            path: 'profile',
            select: {
              _id: 1,
              firstName: 1,
              middleName: 1,
              lastName: 1,
            },
          },
        })
        .populate({
          path: 'merchant',
          select: {
            _id: 1,
          },
          populate: {
            path: 'merchant',
            select: {
              _id: 1,
            },
            populate: {
              path: 'profile',
              select: {
                _id: 1,
                firstName: 1,
                middleName: 1,
                lastName: 1,
              },
            },
          },
        })
        .limit(limit)
        .skip(skip)
        .sort('name ASC');

      const result: IPaginatedBooking = {
        data,
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.bookingModel.countDocuments(searchQuery),
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
