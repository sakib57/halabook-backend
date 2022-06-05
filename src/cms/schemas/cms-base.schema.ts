import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ButtonDocument, ButtonSchema } from './button.schema';

export type CmsBaseDocument = CmsBase & Document;

@Schema()
export class CmsBase {
  @Prop()
  headline: string;

  @Prop({
    minlength: 3,
    maxlength: 30,
  })
  title: string;

  @Prop({
    minlength: 3,
    maxlength: 3000,
  })
  description: string;

  @Prop()
  image: string;

  @Prop({
    type: [],
    default: undefined,
  })
  contents: [];

  @Prop({
    type: [ButtonSchema],
    default: undefined,
  })
  buttons: ButtonDocument[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CmsBaseSchema = SchemaFactory.createForClass(CmsBase);
