import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { UserDocument } from '../../user/schemas/user.schema';

export type ScheduleDocument = Schedule & Document;

@Schema()
export class Schedule {
  // timeFrom - timeTo represents date wise time, should be given as millisecond
  // timeFrom - timeTo is a timestamp
  @Prop({ required: true })
  timeFrom: number;

  @Prop({ required: true })
  timeTo: number;

  @Prop({ required: true })
  date: number;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  user: UserDocument;

  @Prop({ required: true })
  status: string;

  @Prop({
    minlength: 3,
    maxlength: 500,
  })
  comment: string;

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

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
