import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  MethodNotAllowedException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { IUser } from 'src/user/interfaces';
import { IBooking } from '../interfaces';
import { BookingService } from '../services/booking.service';
import { UpdateBookingDTO, CreateBulkBookingDTO } from '../dto';
import { IPaginatedBooking } from '../interfaces';
import { FilterBookingDTO } from '../dto/filter-booking.dto';

@ApiTags('Booking')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('booking')
export class BookingController {
  /**
   * Constructor
   * @param {BookingService} bookingService
   */
  constructor(private readonly bookingService: BookingService) {}

  /**
   * Create bulk booking
   * @param {IUser} user
   * @param {CreateBulkBookingDTO} cBulkBookingDTO
   * @returns {Promise<IBooking[]>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Multiple Booking Creation' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return all new booking.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: 'Record already exist',
  })
  @UsePipes(new ValidationPipe(true))
  @UseGuards(JwtAuthGuard)
  @Post('add')
  public async create(
    @User() user: IUser,
    @Body() cBulkBookingDTO: CreateBulkBookingDTO,
  ): Promise<IBooking[]> {
    try {
      return this.bookingService.bulkCreate(user, cBulkBookingDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('bulk-add')
  public createBulkGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('bulk-add')
  public createBulkPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('bulk-add')
  public createBulkPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('bulk-add')
  public createBulkDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * Update booking
   * @param {string} id
   * @param {UpdateBookingDTO} updateBookingDTO
   * @returns {Promise<IBooking>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Booking Update' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return updated boooking.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: 'Record already exist',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateBookingDTO: UpdateBookingDTO,
    user: IUser,
  ): Promise<IBooking> {
    try {
      return await this.bookingService.update(id, updateBookingDTO, user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('update')
  public updateGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Post('update')
  public updatePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('update')
  public updatePut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('update')
  public updateDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * Find booking list
   * @param {string} id
   * @returns {Promise<IBooking>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Fetch Booking List' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return boooking list',
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(true))
  @Get('list')
  public async findAll(
    @Query() query: FilterBookingDTO,
  ): Promise<IPaginatedBooking> {
    try {
      return await this.bookingService.findAll(query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiExcludeEndpoint()
  @Post('list')
  public findAllPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('list')
  public findAllPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('list')
  public findAllPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('list')
  public findAllDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * Find one booking by id
   * @param {string} id
   * @returns {Promise<IBooking>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Find One Booking' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return found boooking.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<IBooking> {
    try {
      return await this.bookingService.findOne(id);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiExcludeEndpoint()
  @Post(':id')
  public findOnePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put(':id')
  public findOnePut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch(':id')
  public findOnePatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete(':id')
  public findOneDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}
