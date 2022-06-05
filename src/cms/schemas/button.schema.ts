import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ButtonDocument = Button & Document;

@Schema()
export class Button {
  @Prop({
    minlength: 1,
    maxlength: 30,
  })
  text: string;

  @Prop()
  icon: string;

  @Prop()
  url: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const ButtonSchema = SchemaFactory.createForClass(Button);
