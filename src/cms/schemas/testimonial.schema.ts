import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestimonialDocument = Testimonial & Document;

@Schema()
export class Testimonial {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  givenBy: string;

  @Prop()
  givenUserAvatar: string;

  @Prop()
  givenUserDesignation: string;

  @Prop({ default: false })
  isDeleted: boolean;
}
export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
