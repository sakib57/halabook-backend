export interface IEvent {
  dateFrom: number;
  dateTo: number;
  readonly saloonProfile: string;
  readonly status: string;
  readonly comment: string;
  readonly isDeleted: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
}
