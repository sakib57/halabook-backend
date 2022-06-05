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
import { EventService } from '../services/event.service';
import { NullValidationPipe } from '../../common/pipes/null-validator.pipe';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { TrimPipe } from '../../common/pipes/trim.pipe';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { IUser } from '../../user/interfaces';
import { CreateEventDTO, UpdateEventDTO } from '../dto';
import { IEvent } from '../interfaces/event.interface';
import { SearchQueryDTO } from '../../common/dto/searchquery.dto';
import { IPaginatedEvent } from '../interfaces/pagination.interface';

/**
 * Tag Controller
 */
@ApiTags('Custom Event')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('event')
export class EventController {
  /**
   * Constructor
   * @param {EventService} eventService
   */
  constructor(private readonly eventService: EventService) {}

  /**
   * Create event
   * @param {IUser} user
   * @param {CreateEventDTO} cEventDTO
   * @returns {Promise<IEvent>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Custom event add' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new event.',
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
    @Body() cEventDTO: CreateEventDTO,
  ): Promise<IEvent> {
    try {
      return this.eventService.create(user, cEventDTO);
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
   * update event
   * @Param {string} id
   * @Body {UpdateEventDTO} uEventDTO
   * @Param {IUser} user
   * @returns {Promise<IEvent>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Update event' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated event.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Event not found',
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
    @Body() uEventDTO: UpdateEventDTO,
    @User() user: IUser,
  ): Promise<IEvent> {
    try {
      return this.eventService.update(id, uEventDTO, user);
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
   * delete event
   * @Param {string} id
   * @returns {Promise<IEvent>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Delete event' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Event not found',
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
      return this.eventService.delete(id);
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
   * Find event
   * @Query {Object} query
   * @returns {Promise<IPaginatedEvent>}
   */
  @ApiOperation({ summary: 'Get events' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'This is private api. Return events.',
  })
  @Get('list')
  @UsePipes(new ValidationPipe(true))
  findAll(@Query() query: SearchQueryDTO): Promise<IPaginatedEvent> {
    try {
      return this.eventService.findAll(query);
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
