export interface ICompensation {
  readonly _id: string;
  readonly service: string;
  readonly price: number;
  readonly quotes: string;
  readonly isPriceFixed: boolean;
  readonly isDeleted: boolean;
}