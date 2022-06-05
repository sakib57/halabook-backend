import { IBooking } from '.';
import { IPaginate } from '../../common/interfaces';

export interface IPaginatedBooking extends IPaginate {
  data: IBooking[];
}
