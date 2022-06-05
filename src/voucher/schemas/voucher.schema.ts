import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { VoucherType } from '../../common/mock/constant.mock';

export type VoucherDocument = Voucher & Document;

@Schema()
export class Voucher {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ default: Date.now() })
  activeTime: number;

  @Prop()
  expireTime: number;

  @Prop({ default: VoucherType.PERCENTAGE })
  amountType: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  maxAmountLimit: number;

  @Prop({ default: 0 })
  minimumSpending: number;

  @Prop()
  promotionalText: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: Date.now() })
  cTime: number;

  @Prop()
  cBy: string;

  @Prop({ default: Date.now() })
  uTime: number;

  @Prop()
  uBy: string;
}

export const VoucherSchema = SchemaFactory.createForClass(Voucher);
