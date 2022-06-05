import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  UsePipes,
  HttpStatus,
  HttpException,
  MethodNotAllowedException,
  Query,
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
import { MerchantService } from '../services';
import { CreateMerchantDTO, UpdateMerchantDTO } from '../dto/merchant';
import { IMerchant } from '../interfaces';
import { SearchQueryDTO } from '../../common/dto/searchquery.dto';
import { IPaginateMerchant } from '../interfaces/merchant-paginate.interface';

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
@Controller()
export class MerchantController {
  /**
   * Constructor
   * @param {MerchantService} merchantService
   */
  constructor(private readonly merchantService: MerchantService) {}

  /**
   * Associate merchant with saloon-profile
   * @Body {CreateMerchantDTO} createMerchantDTO
   * @User user: IUser
   * @returns {Promise<IMerchant>}
   */
  @ApiOperation({ summary: 'Associate merchant with saloon-profile' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return association of merchant with saloon-profile.',
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
  @Post('saloon-profile/merchant/add')
  create(
    @User() user: IUser,
    @Body() createMerchantDTO: CreateMerchantDTO,
  ): Promise<IMerchant> {
    try {
      return this.merchantService.create(user, createMerchantDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('saloon-profile/provider/add')
  public createGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('saloon-profile/provider/add')
  public createPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('saloon-profile/provider/add')
  public createPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('saloon-profile/provider/add')
  public createDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * Edit the association of merchant with saloon-profile
   * @param {string} id
   * @param {UpdateMerchantDTO} updateMerchantDTO
   * @param {IUser} user
   * @returns {Promise<IMerchant>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({
    summary: 'Edit the association of merchant with saloon-profile',
  })
  @ApiOperation({
    summary: 'Edit the association of merchant with saloon-profile',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Return the updated association of merchant with saloon-profile.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'Could not find any association of merchant with saloon-profile.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description:
      "Merchant or Saloon-profile can't be changed or An admin can't be deleted",
  })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Put('saloon-profile/merchant/update/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateMerchantDTO: UpdateMerchantDTO,
    @User() user: IUser,
  ): Promise<IMerchant> {
    try {
      return this.merchantService.update(id, user, updateMerchantDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('saloon-profile/merchant/update/:id')
  public updateGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Post('saloon-profile/merchant/update/:id')
  public updatePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('saloon-profile/merchant/update/:id')
  public updatePatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('saloon-profile/merchant/update/:id')
  public updateDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * Fetches all merchant of saloon-profile
   * @returns {Promise<IPaginateMerchant} queried user data
   */
  @ApiOperation({ summary: 'Fetches all merchant of saloon-profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'This is private api. Fetches all merchant of saloon-profile.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No token is received or token expire',
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @UseGuards(JwtAuthGuard)
  @Get('saloon-profile/:saloonId/merchants')
  @UsePipes(new ValidationPipe(true))
  findAllUser(
    @Param('saloonId') saloonId: string,
    @Query() query: SearchQueryDTO,
  ): Promise<IPaginateMerchant> {
    try {
      return this.merchantService.findAllMerchant(saloonId, query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Post('saloon-profile/:saloonId/merchants')
  public findAllUserPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('saloon-profile/:saloonId/merchants')
  public findAllUserPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('saloon-profile/:saloonId/merchants')
  public findAllUserPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('saloon-profile/:saloonId/merchants')
  public findAllUserDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * Fetches all saloon of mearchant
   * @returns {Promise<IMerchant[]} queried user data
   */
  @ApiOperation({ summary: 'Fetches all saloon-profile of merchant' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'This is private api. Fetches all saloon-profile of mercahnt.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No token is received or token expire',
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @UseGuards(JwtAuthGuard)
  @Get('saloon-profile/:merchantId/saloons')
  @UsePipes(new ValidationPipe(true))
  findAllSaloonByMerchant(
    @Param('merchantId') merchantId: string,
    @Query() query: SearchQueryDTO,
  ): Promise<any> {
    try {
      return this.merchantService.findAllProfile(merchantId, query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Post('saloon-profile/:saloonId/merchants')
  public findAllSaloonByMerchantPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('saloon-profile/:saloonId/merchants')
  public findAllSaloonByMerchantPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('saloon-profile/:saloonId/merchants')
  public findAllSaloonByMerchantPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('saloon-profile/:saloonId/merchants')
  public findAllSaloonByMerchantDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}
