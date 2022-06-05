import { ICmsBase } from './cms-base.interface';
import { ISocial } from '../../common/interfaces';

export interface IFooter extends ICmsBase {
  readonly socials: ISocial[];
}
