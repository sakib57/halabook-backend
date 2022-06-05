import { IPaginate } from '../../common/interfaces';
import { IVoucher } from './voucher.interface';

export interface IPaginatedVoucher extends IPaginate {
  data: IVoucher[];
}
