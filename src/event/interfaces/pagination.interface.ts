import { IPaginate } from '../../common/interfaces';
import { IEvent } from './event.interface';

export interface IPaginatedEvent extends IPaginate {
  data: IEvent[];
}
