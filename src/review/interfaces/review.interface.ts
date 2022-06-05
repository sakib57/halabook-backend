import { IBooking } from 'src/booking/interfaces';
import { ISProfile } from 'src/saloon-profile/interfaces';
import { IUserProfile } from 'src/user/interfaces';

export interface IReview {
  readonly _id: string;
  readonly title: string;
  readonly slug: string;
  readonly user: IUserProfile;
  readonly saloonProfile: ISProfile;
  readonly merchant: IUserProfile;
  readonly customer: IUserProfile;
  readonly booking: IBooking;
  readonly review: string;
  readonly reply: string;
  readonly rating: number;
  readonly pictures: string[];
  readonly helpfulCount: number;
  readonly isActive: boolean;
  readonly isDeleted: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
}
