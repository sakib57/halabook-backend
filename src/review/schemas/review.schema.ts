import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { UserDocument } from '../../user/schemas/user.schema';
import {
  SaloonProfileDocument,
  MerchantDocument,
} from '../../saloon-profile/schemas';
import { BookingDocument } from '../../booking/schemas/booking.schema';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({
    minlength: 3,
    maxlength: 150,
  })
  title: string;

  @Prop({
    unique: true,
    minlength: 3,
    maxlength: 10,
  })
  slug: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  user: UserDocument;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'SaloonProfile',
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
    ref: 'Booking',
  })
  booking: BookingDocument;

  @Prop({
    minlength: 3,
    maxlength: 5000,
  })
  review: string;

  @Prop({
    minlength: 3,
    maxlength: 5000,
  })
  reply: string;

  @Prop()
  rating: number;

  @Prop({
    type: [],
    default: undefined,
  })
  pictures: string[];

  @Prop()
  helpfulCount: number;

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

export const ReviewSchema = SchemaFactory.createForClass(Review);
