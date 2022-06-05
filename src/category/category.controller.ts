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
  Logger,
  Query,
  Param,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { IUser } from '../user/interfaces';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { TrimPipe } from '../common/pipes/trim.pipe';
import { User } from '../common/decorators/user.decorator';
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
import { CategoryService } from './category.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto';
import { ICategory } from './interfaces/category.interface';
import { SearchQueryDTO } from 'src/common/dto/searchquery.dto';
import { IPaginatedCategory } from './interfaces/pagination.interface';
import { CategoryImageUploadDTO } from './dto/update-category-image.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

/**
 * Category Controller
 */
@ApiTags('Category')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('category')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);

  /**
   * Constructor
   * @param {CategoryService} categoryService
   */
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Create category
   * @param {IUser} user
   * @param {CreateCategoryDTO} createCategoryDTO
   * @returns {Promise<ICategory>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Category Creation' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new category.',
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
    @Body() createCategoryDTO: CreateCategoryDTO,
  ): Promise<ICategory> {
    try {
      return await this.categoryService.create(user, createCategoryDTO);
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
  @ApiOperation({ summary: 'Category Update' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return modified category.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CategoryImageUploadDTO })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'pictures', maxCount: 8 },
      { name: 'videos', maxCount: 3 },
    ]),
  )
  @Put('update/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateCategoryDTO: UpdateCategoryDTO,
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File[];
      pictures?: Express.Multer.File[];
      videos?: Express.Multer.File[];
    },
    @User() user: IUser,
  ): Promise<ICategory> {
    try {
      return await this.categoryService.update(
        id,
        updateCategoryDTO,
        files,
        user,
      );
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Category Update' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return modified category.',
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
  public async updatePatch(
    @Param('id') id: string,
    @Body() updateCategoryDTO: UpdateCategoryDTO,
    @User() user: IUser,
  ): Promise<ICategory> {
    try {
      return await this.categoryService.update(
        id,
        updateCategoryDTO,
        null,
        user,
      );
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
   * Find categories
   * @Query {Object} query
   * @returns {Promise<ICategory[]>}
   */
  @ApiOperation({ summary: 'Get categories' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'This is public api. Return categories.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No token is received or token expire',
  })
  @Get('list')
  @UsePipes(new ValidationPipe(true))
  findAll(@Query() query: SearchQueryDTO): Promise<IPaginatedCategory> {
    try {
      return this.categoryService.findAll(query);
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
