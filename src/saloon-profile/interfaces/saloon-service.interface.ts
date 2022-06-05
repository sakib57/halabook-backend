import { ISProfile } from 'src/saloon-profile/interfaces';
import { ICategory } from '../../category/interfaces';

export interface ISaloonService {
  readonly _id: string;
  readonly name: string;
  readonly category: ICategory;
  readonly saloonProfile: ISProfile;
  readonly price: number;
  readonly isDeleted: boolean;
}
