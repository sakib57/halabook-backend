import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompensationDocument = Compensation & Document;

@Schema()
export class Compensation {
  @Prop({
    minlength: 2,
    maxlength: 200,
    require: true,
  })
  service: string;

  @Prop({
    require: true,
  })
  price: number;

  @Prop({
    minlength: 3,
    maxlength: 200,
  })
  quotes: string;

  @Prop({ default: false })
  isPriceFixed: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CompensationSchema = SchemaFactory.createForClass(Compensation);
