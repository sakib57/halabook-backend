import { IUser } from '../../user/interfaces';
import { WorkSchedule } from '../schemas/schedule.schema';
import { ISProfile } from './saloon-profile.interface';
import { ISaloonService } from './saloon-service.interface';

export interface IMerchant {
  readonly _id: string;
  readonly merchant: IUser;
  readonly saloonProfile: ISProfile;
  readonly isAdmin: boolean;
  readonly isOwner: boolean;
  readonly status: string;
  readonly services: ISaloonService[];
  readonly workSchedules: WorkSchedule[];
  readonly isPaid: boolean;
  readonly isActive: boolean;
  readonly isDeleted: boolean;
}
