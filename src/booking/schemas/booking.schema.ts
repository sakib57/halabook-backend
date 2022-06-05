import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import {
  SaloonProfileDocument,
  MerchantDocument,
} from '../../saloon-profile/schemas';
import { Status } from '../../common/mock/constant.mock';
import { UserDocument } from '../../user/schemas/user.schema';
import { SaloonServiceDocument } from '../../saloon-profile/schemas/saloon-service.schema';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'SaloonProfile',
    required: true,
  })
  saloonProfile: SaloonProfileDocument;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Merchant',
  })
  merchant: MerchantDocument;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
  })
  customer: UserDocument;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'SaloonService',
  })
  service: SaloonServiceDocument;

  @Prop()
  requestDate: number;

  @Prop()
  requestSlot: number;

  @Prop({ default: 1 })
  interval: number;

  @Prop({ default: Status.PENDING })
  status: string;

  @Prop({ default: false })
  isMerchantReviewEnabled: boolean;

  @Prop({ default: false })
  isCustomerReviewEnabled: boolean;

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

export const BookingSchema = SchemaFactory.createForClass(Booking);

BookingSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    return {
      _id: ret._id,
      saloonProfile: ret.saloonProfile,
      merchant: ret.merchant,
      service: ret.service,
      customer: ret.customer,
      requestDate: ret.requestDate,
      requestSlot: ret.requestSlot,
      interval: ret.interval,
      status: ret.status,
      isMerchantReviewEnabled: ret.isMerchantReviewEnabled,
      isCustomerReviewEnabled: ret.isCustomerReviewEnabled,
      isActive: ret.isActive,
      isDeleted: ret.isDeleted,
    };
  },
});
