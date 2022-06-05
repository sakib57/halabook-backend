import { ISProfile } from 'src/saloon-profile/interfaces';
import { IUserProfile } from 'src/user/interfaces';
import { ISaloonService } from '../../saloon-profile/interfaces/saloon-service.interface';

export interface IBooking {
  readonly _id: string;
  readonly saloonProfile: ISProfile;
  readonly merchant: IUserProfile;
  readonly service: ISaloonService;
  readonly customer: IUserProfile;
  readonly requestDate: number;
  readonly requestSlot: number;
  readonly isActive: boolean;
  readonly isDeleted: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
}
