import { Mobile, Social } from '../../common/schemas';
import { WorkSchedule } from '../schemas/schedule.schema';
import { ICategory } from '../../category/interfaces';
import { ILocation } from '../../common/interfaces';
import { Document } from 'mongoose';
import { IMerchant } from './merchant.interface';
import { ICompensation } from './compensation.interface';
import { ISaloonService } from './saloon-service.interface';
// import { IReview } from '../../review/interfaces/review.interface';

export interface ISProfile extends Document {
  readonly _id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly location: ILocation;
  readonly categories: ICategory[];
  readonly services: ISaloonService[];
  readonly thumbnail: string;
  readonly pictures: string[];
  readonly videos: string[];
  readonly email: string;
  readonly mobile: Mobile;
  // readonly compensations: ICompensation;
  readonly workSchedules: WorkSchedule[];
  readonly socials: Social[];
  readonly viewCount: number;
  readonly ratings: number;
  // readonly reviews: IReview[];
  readonly merchants: IMerchant[];
  readonly profilePercentage: number;
  readonly isSubscribed: boolean;
  readonly isActive: boolean;
  readonly isVerified: boolean;
  readonly isDeleted: boolean;
}
