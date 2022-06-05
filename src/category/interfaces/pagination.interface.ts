import { IPaginate } from '../../common/interfaces';
import { ICategory } from './category.interface';

export interface IPaginatedCategory extends IPaginate {
  data: ICategory[];
}
