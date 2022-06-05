import { IPaginate } from '../../common/interfaces';
import { IMerchant } from './merchant.interface';

export interface IPaginateMerchant extends IPaginate {
  data: IMerchant[];
}
