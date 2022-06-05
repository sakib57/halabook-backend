import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  UseGuards,
  UsePipes,
  HttpStatus,
  HttpException,
  MethodNotAllowedException,
  Param,
  Query,
  Logger,
} from '@nestjs/common';
import { IUser } from '../../user/interfaces';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { TrimPipe } from '../../common/pipes/trim.pipe';
import { User } from '../../common/decorators/user.decorator';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiHeader,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { SaloonServiceService } from '../services/saloon-service.service';
import {
  CreateSaloonServiceDTO,
  UpdateSaloonServiceDTO,
} from '../dto/saloon-service';
import { ISaloonService } from '../interfaces/saloon-service.interface';
import { SearchQueryDTO } from 'src/common/dto/searchquery.dto';
import { IPaginateSaloonService } from '../interfaces/s-service-paginate.interface';

/**
 * Saloon-Provider Controller
 */
@ApiTags('Saloon-Profile')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('saloon-profile/service')
export class SaloonServiceController {
  private readonly logger = new Logger(SaloonServiceController.name);
  /**
   * Constructor
   * @param {SaloonServiceService} sServiceService
   */
  constructor(private readonly sServiceService: SaloonServiceService) {}

  /**
   * Create Saloon Service
   * @Body {createSServiceDTO} CreateSaloonServiceDTO
   * @User user: IUser
   * @returns {Promise<IMerchant>}
   */
  @ApiOperation({ summary: 'Create Saloon Service' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return created saloon-service.',
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
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Post('add')
  create(
    @User() user: IUser,
    @Body() createSServiceDTO: CreateSaloonServiceDTO,
  ): Promise<ISaloonService> {
    try {
      return this.sServiceService.create(user, createSServiceDTO);
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
   * Update Saloon Service
   * @Body {updateSServiceDTO} CreateSaloonServiceDTO
   * @User user: IUser
   * @returns {Promise<ISaloonService>}
   */
  @ApiOperation({ summary: 'Update Saloon Service' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return updated saloon-service.',
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
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  update(
    @Param('id') id,
    @User() user: IUser,
    @Body() updateSServiceDTO: UpdateSaloonServiceDTO,
  ): Promise<ISaloonService> {
    try {
      return this.sServiceService.update(id, user, updateSServiceDTO);
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
  @Patch('update/:id')
  public updatePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('update/:id')
  public updateDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * Find one by saloon id
   * @returns {Promise<IPaginateSaloonService>}
   */
  @ApiOperation({ summary: 'Find One By Saloon Id' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return updated saloon-service.',
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
  @UsePipes(new TrimPipe())
  @Get(':saloonId')
  findAllBySaloonId(
    @Param('saloonId') saloonId,
    @Query() query: SearchQueryDTO,
  ): Promise<IPaginateSaloonService> {
    try {
      return this.sServiceService.findAllBySaloon(saloonId, query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get(':saloonId')
  public findOneBySaloonIdPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put(':saloonId')
  public findOneBySaloonIdPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch(':saloonId')
  public findOneBySaloonIdPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete(':saloonId')
  public findOneBySaloonIdDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}
