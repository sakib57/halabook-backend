import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { SaloonProfileDocument } from '../../saloon-profile/schemas';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop({ required: true })
  dateFrom: number;

  @Prop()
  dateTo: number;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'SaloonProfile',
    required: true,
  })
  saloonProfile: SaloonProfileDocument;

  @Prop({ required: true })
  status: string;

  @Prop({
    minlength: 3,
    maxlength: 500,
  })
  comment: string;

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

export const EventSchema = SchemaFactory.createForClass(Event);
