import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IReview } from '../interfaces/review.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/user/interfaces';
import { CreateReviewDTO, ReviewDTO, UpdateReviewDTO } from '../dto';
import { SearchReviewDTO } from '../dto/search-review.dto';

/**
 * Review Service
 */
@Injectable()
export class ReviewService {
  /**
   * Constructor
   * @param {Model<IReview>} reviewModel
   */
  constructor(
    @InjectModel('Review')
    private readonly reviewModel: Model<IReview>,
  ) {}

  /**
   * Create booking
   * @param {CreateReviewDTO} createReviewDto
   * @returns {Promise<IReview>}
   */
  create(user: IUser, createReviewDto: CreateReviewDTO) {
    try {
      const reviewDto = new ReviewDTO();
      const setReview = { ...createReviewDto, ...reviewDto };
      setReview.user = user._id;
      const registerDoc = new this.reviewModel(setReview);
      return registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update review
   * @param {string} id
   * @param {UpdateReviewDTO} updateReviewDto
   * @returns {Promise<IReview>}
   */
  async update(id: string, updateReviewDto: UpdateReviewDTO) {
    try {
      const review = await this.reviewModel.findOne({ _id: id });
      if (!review) {
        return Promise.reject(new NotFoundException('Could not find review.'));
      }
      const reviewDto = new ReviewDTO();
      reviewDto.uTime = Date.now();
      const setReview = { ...updateReviewDto, ...reviewDto };
      return await review.set(setReview).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find all review
   * @returns {Promise<IReview>}
   */
  async findAll(query: SearchReviewDTO) {
    try {
      const data = await this.reviewModel.find(query);
      if (!data) {
        throw new NotFoundException('No review found');
      }
      return data;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
