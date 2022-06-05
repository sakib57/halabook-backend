import { IButton } from './button.interface';

export interface ICmsBase {
  readonly _id: string;
  readonly headline: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly contents: [];
  readonly buttons: IButton[];
  readonly isDeleted: boolean;
}
