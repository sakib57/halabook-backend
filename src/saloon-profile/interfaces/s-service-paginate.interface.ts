import { IPaginate } from '../../common/interfaces';
import { ISaloonService } from './saloon-service.interface';

export interface IPaginateSaloonService extends IPaginate {
  data: ISaloonService[];
}
