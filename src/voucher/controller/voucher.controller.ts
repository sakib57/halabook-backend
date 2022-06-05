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
import { VoucherService } from '../services/voucher.service';
import { NullValidationPipe } from '../../common/pipes/null-validator.pipe';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { TrimPipe } from '../../common/pipes/trim.pipe';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { IUser } from '../../user/interfaces';
import { CreateVoucherDTO, UpdateVoucherDTO } from '../dto';
import { IVoucher } from '../interfaces/voucher.interface';
import { SearchQueryDTO } from 'src/common/dto/searchquery.dto';
import { IPaginatedVoucher } from '../interfaces/pagination.interface';

/**
 * Voucher Controller
 */
@ApiTags('Voucher')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('voucher')
export class VoucherController {
  /**
   * Constructor
   * @param {VoucherService} voucherService
   */
  constructor(private readonly voucherService: VoucherService) {}

  /**
   * Create voucher
   * @param {IUser} user
   * @param {CreateVoucherDTO} cVoucherDTO
   * @returns {Promise<IVoucher>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Voucher add' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new voucher.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: 'Record already exist',
  })
  @UsePipes(new NullValidationPipe())
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Post('add')
  public create(
    @User() user: IUser,
    @Body() cVoucherDTO: CreateVoucherDTO,
  ): Promise<IVoucher> {
    try {
      return this.voucherService.create(user, cVoucherDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('add')
  public createGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('add')
  public createPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('add')
  public createPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('add')
  public createDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * update voucher
   * @Param {string} id
   * @Body {UpdateVoucherDTO} uVoucherDTO
   * @Param {IUser} user
   * @returns {Promise<IVoucher>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Update voucher' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated voucher.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Schedule not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new NullValidationPipe())
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  public update(
    @Param('id') id: string,
    @Body() uVoucherDTO: UpdateVoucherDTO,
    @User() user: IUser,
  ): Promise<IVoucher> {
    try {
      return this.voucherService.update(id, uVoucherDTO, user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('update/:id')
  public updateGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('update/:id')
  public updatePut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Post('update/:id')
  public updatePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('update/:id')
  public updateDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * find all voucher
   * @returns {Promise<IPaginatedVoucher[]>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Update voucher' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated voucher.',
  })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(true))
  @Get('list')
  public findAll(@Query() query: SearchQueryDTO): Promise<IPaginatedVoucher> {
    try {
      return this.voucherService.findAll(query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('list')
  public listPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('list')
  public listPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Post('list')
  public listPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('list')
  public listDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}
