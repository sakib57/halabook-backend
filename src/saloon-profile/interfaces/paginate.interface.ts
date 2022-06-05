import { IPaginate } from '../../common/interfaces';
import { ISProfile } from './saloon-profile.interface';

export interface IPaginateSProfile extends IPaginate {
  data: ISProfile[];
}
