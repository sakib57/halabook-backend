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
  UseInterceptors,
  UploadedFiles,
  HttpStatus,
  HttpException,
  MethodNotAllowedException,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { IUser } from '../../user/interfaces';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { NullValidationPipe } from '../../common/pipes/null-validator.pipe';
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
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { SaloonProfileService } from '../services';
import {
  CreateSProfileDTO,
  UpdateSProfileDTO,
  SaloonImageUploadDTO,
} from '../dto/saloon-profile';
import { IPaginateSProfile, ISProfile } from '../interfaces';
import { SearchQueryDTO } from 'src/common/dto/searchquery.dto';

/**
 * Saloon-Profile Controller
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
@Controller('saloon-profile')
export class SaloonProfileController {
  /**
   * Constructor
   * @param {SaloonProfileService} sProfileService
   */
  constructor(private readonly sProfileService: SaloonProfileService) {}

  /**
   * Create saloon profile
   * @param {IUser} user
   * @param {CreateSProfileDTO} createSProfileDTO
   * @returns {Promise<ISProfile>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Saloon-profile Creation' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new saloon-profile.',
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
  @UsePipes(new ValidationPipe())
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Post('add')
  public async create(
    @User() user: IUser,
    @Body() createSProfileDTO: CreateSProfileDTO,
  ): Promise<ISProfile> {
    try {
      return await this.sProfileService.create(user, createSProfileDTO);
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
   * update saloon-profile
   * @Param {string} id
   * @Body {UpdateSProfileDTO} updateSProfile
   * @Param {IUser} user
   * @returns {Promise<ISProfile>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Update saloon-profile update' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated Update saloon-profile.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Update saloon-profile not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SaloonImageUploadDTO })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'pictures', maxCount: 8 },
      { name: 'videos', maxCount: 3 },
    ]),
  )
  @Put('update/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateSProfile: UpdateSProfileDTO,
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File[];
      pictures?: Express.Multer.File[];
      videos?: Express.Multer.File[];
    },
    @User() user: IUser,
  ): Promise<ISProfile> {
    try {
      return this.sProfileService.update(id, updateSProfile, files, user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Update saloon-profile update' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated Update saloon-profile.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Update saloon-profile not found',
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
  public updatePatch(
    @Param('id') id: string,
    @Body() updateSProfile: UpdateSProfileDTO,
    @User() user: IUser,
  ): Promise<ISProfile> {
    try {
      return this.sProfileService.update(id, updateSProfile, null, user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * find all saloon-profile
   * @returns {Promise<ISProfile>}
   */
  @ApiOperation({ summary: 'Get all saloon profile' })
  @UsePipes(new ValidationPipe(true))
  @Get('list')
  public findAll(@Query() query: SearchQueryDTO): Promise<IPaginateSProfile> {
    try {
      return this.sProfileService.findAll(query);
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
   * find one saloon-profile
   * @Param {string} slug
   * @returns {Promise<ISProfile>}
   */
  @ApiOperation({ summary: 'Find one Saloon-profile by Slug' })
  @Get(':slug')
  public findOne(@Param('slug') slug: string): Promise<ISProfile> {
    try {
      return this.sProfileService.findOne(slug);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
  @ApiExcludeEndpoint()
  @Post(':slug')
  public findOnePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put(':slug')
  public findOnePut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch(':slug')
  public findOnePatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete(':slug')
  public findOneDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}
