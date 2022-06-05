import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
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
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { SearchQueryDTO } from 'src/common/dto/searchquery.dto';
import { TrimPipe } from 'src/common/pipes/trim.pipe';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { IUser } from 'src/user/interfaces';
import { CmsDTO } from '../dto/cms.dto';
import { ICms } from '../interfaces/cms.interface';
import { CmsService } from '../services/cms.service';

/**
 * Cms Controller
 */
@ApiTags('Cms')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('cms')
export class CmsController {
  private readonly logger = new Logger(CmsController.name);

  /**
   * Constructor
   * @param {CmsService} cmsService
   */
  constructor(private readonly cmsService: CmsService) {}

  /**
   * Create cms
   * @param {IUser} user
   * @param {CmsDTO} cmsDTO
   * @returns {Promise<ICms>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Cms Creation' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new cms.',
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
  public async create(
    @User() user: IUser,
    @Body() cmsDTO: CmsDTO,
  ): Promise<ICms> {
    try {
      return await this.cmsService.create(user, cmsDTO);
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
   * Update category
   * @param {string} id
   * @param {IUser} user
   * @param {UpdateCategoryDTO} updateCategoryDTO
   * @returns {Promise<ICategory>}
   */

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Cms Update' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return modified cms.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  public async updatePatch(
    @Param('id') id: string,
    @Body() cmsDTO: CmsDTO,
    @User() user: IUser,
  ): Promise<ICms> {
    try {
      return await this.cmsService.update(id, cmsDTO, null, user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('update/:id')
  public updatePatchGet() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Post('update/:id')
  public updatePatchPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('update/:id')
  public updatePatchPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('update/:id')
  public updatePatchDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * Find cms
   * @Query {Object} query
   * @returns {Promise<ICms>}
   */
  @ApiOperation({ summary: 'Get cms' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'This is public api. Return cms.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No token is received or token expire',
  })
  @Get('list')
  @UsePipes(new ValidationPipe())
  findAll(@Query() query: SearchQueryDTO): Promise<ICms[]> {
    try {
      return this.cmsService.findAll(query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Post('find')
  public findPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('find')
  public findPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('find')
  public findPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('find')
  public findDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}
