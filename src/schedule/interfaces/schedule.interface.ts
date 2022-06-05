export interface ISchedule {
  timeFrom: number;
  timeTo: number;
  readonly date: number;
  readonly user: string;
  readonly status: string;
  readonly comment: string;
  readonly isActive: boolean;
  readonly isDeleted: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
}
