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
  UseGuards,
  UsePipes,
  HttpCode,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ScheduleService } from '../services/schedule.service';
import { NullValidationPipe } from '../../common/pipes/null-validator.pipe';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { TrimPipe } from '../../common/pipes/trim.pipe';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { IUser } from '../../user/interfaces';
import { CreateScheduleDTO, UpdateScheduleDTO } from '../dto';
import { ISchedule } from '../interfaces/schedule.interface';
import { SearchQueryDTO } from '../../common/dto/searchquery.dto';

/**
 * Schedule Controller
 */
@ApiTags('Custom Schedule')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('schedule')
export class ScheduleController {
  /**
   * Constructor
   * @param {ScheduleService} scheduleService
   */
  constructor(private readonly scheduleService: ScheduleService) {}

  /**
   * Create schedule
   * @param {IUser} user
   * @param {CreateScheduleDTO} cScheduleDTO
   * @returns {Promise<ISchedule>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Custom schedule add' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new schedule.',
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
    @Body() cScheduleDTO: CreateScheduleDTO,
  ): Promise<ISchedule> {
    try {
      return this.scheduleService.create(user, cScheduleDTO);
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
   * update schedule
   * @Param {string} id
   * @Body {UpdateEventDto} uScheduleDTO
   * @Param {IUser} user
   * @returns {Promise<ISchedule>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Update schedule' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated schedule.',
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
    @Body() uScheduleDTO: UpdateScheduleDTO,
    @User() user: IUser,
  ): Promise<ISchedule> {
    try {
      return this.scheduleService.update(id, uScheduleDTO, user);
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
   * delete schedule
   * @Param {string} id
   * @returns {Promise<ISchedule>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Delete schedule' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Schedule not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete('delete/:id')
  public async delete(@Param('id') id: string) {
    try {
      return this.scheduleService.delete(id);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('delete/:id')
  public deleteGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('delete/:id')
  public deletePut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Post('delete/:id')
  public deletePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('delete/:id')
  public deleteDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * Find schedule
   * @Query {Object} query
   * @returns {Promise<ISchedule[]>}
   */
  @ApiOperation({ summary: 'Get schedules' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'This is private api. Return schedules.',
  })
  @Get('list')
  @UsePipes(new ValidationPipe(true))
  findAll(@Query() query: SearchQueryDTO): Promise<ISchedule[]> {
    try {
      return this.scheduleService.findAll(query);
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
}
