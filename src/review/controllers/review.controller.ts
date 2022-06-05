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
import { CreateReviewDTO, UpdateReviewDTO } from '../dto';
import { SearchReviewDTO } from '../dto/search-review.dto';
import { IReview } from '../interfaces/review.interface';
import { ReviewService } from '../services/review.service';

@ApiTags('Review')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('review')
export class ReviewController {
  /**
   * Constructor
   * @param {ReviewService} reviewService
   */
  constructor(private readonly reviewService: ReviewService) {}

  /**
   * Create review
   * @param {CreateReviewDTO} createReviewDTO
   * @returns {Promise<IReview>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Review Creation' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new review',
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
    @Body() createReviewDTO: CreateReviewDTO,
    @User() user: IUser,
  ): Promise<IReview> {
    try {
      return await this.reviewService.create(user, createReviewDTO);
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
   * Update review
   * @param {CreateReviewDTO} createReviewDTO
   * @returns {Promise<IReview>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Review Update' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return updated review',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new ValidationPipe(true))
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateReviewDTO: UpdateReviewDTO,
  ): Promise<IReview> {
    try {
      return await this.reviewService.update(id, updateReviewDTO);
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
  @Post('update/:id')
  public updatePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('update/:id')
  public updatePut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('update/:id')
  public updateDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * Find all review
   * @param {SearchReviewDTO} searchReviewDTO
   * @returns {Promise<IReview>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Review List' })
  @UsePipes(new ValidationPipe(true))
  @Get('list')
  public async findAll(
    @Query() searchReviewDTO: SearchReviewDTO,
  ): Promise<IReview[]> {
    try {
      return await this.reviewService.findAll(searchReviewDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Patch('list')
  public findAllPatch() {
    throw new MethodNotAllowedException('Method not allowed');
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
  @Delete('list')
  public findAllDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}
