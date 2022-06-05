export interface IVoucher {
  readonly code: string;
  readonly activeTime: number;
  readonly expireTime: number;
  readonly amountType: string;
  readonly amount: number;
  readonly maxAmountLimit: number;
  readonly minimumSpending: number;
  readonly promotionalText: string;
  readonly isActive: boolean;
  readonly isDeleted: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
}
