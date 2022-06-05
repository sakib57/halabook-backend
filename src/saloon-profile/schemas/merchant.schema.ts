import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { UserDocument } from '../../user/schemas/user.schema';
import { SaloonProfileDocument } from './saloon-profile.schema';
import { Status } from '../../common/mock/constant.mock';
import { WorkScheduleDocument, WorkScheduleSchema } from './schedule.schema';
import { SaloonServiceDocument } from 'src/saloon-profile/schemas/saloon-service.schema';

export type MerchantDocument = Merchant & Document;

@Schema()
export class Merchant {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  merchant: UserDocument;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'SaloonProfile',
    required: false,
  })
  saloonProfile: SaloonProfileDocument;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: false })
  isOwner: boolean;

  @Prop({ default: Status.INVITED })
  status: string;

  @Prop({
    type: [WorkScheduleSchema],
    default: undefined,
  })
  workSchedules: WorkScheduleDocument[];

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'SaloonService',
    required: false,
  })
  services: SaloonServiceDocument[];

  @Prop({ default: false })
  isPaid: boolean;

  @Prop({ default: false })
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

export const MerchantSchema = SchemaFactory.createForClass(Merchant);

MerchantSchema.virtual('bookings', {
  ref: 'Merchant',
  localField: '_id',
  foreignField: 'merchant',
  options: { sort: { name: 1 } },
  match: { isActive: true, isDeleted: false },
});
