import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CmsBaseDocument, CmsBaseSchema } from './cms-base.schema';
import { TestimonialDocument, TestimonialSchema } from './testimonial.schema';
import { FooterDocument, FooterSchema } from './footer.schema';

export type CmsDocument = Cms & Document;

@Schema()
export class Cms {
  @Prop({
    type: [CmsBaseSchema],
    default: undefined,
  })
  banners: CmsBaseDocument[];

  @Prop({
    type: CmsBaseSchema,
  })
  mobileApp: CmsBaseDocument;

  @Prop({
    type: CmsBaseSchema,
  })
  business: CmsBaseDocument;

  @Prop({
    type: CmsBaseSchema,
  })
  aboutUs: CmsBaseDocument;

  @Prop({
    type: CmsBaseSchema,
  })
  whyUs: CmsBaseDocument;

  @Prop({
    type: [TestimonialSchema],
    default: undefined,
  })
  testimonials: TestimonialDocument[];

  @Prop({
    type: CmsBaseSchema,
  })
  subscription: CmsBaseDocument;

  @Prop({
    type: FooterSchema,
  })
  footer: FooterDocument;

  @Prop({ default: Date.now() })
  cTime: number;

  @Prop()
  cBy: string;

  @Prop({ default: Date.now() })
  uTime: number;

  @Prop()
  uBy: string;
}

export const CmsSchema = SchemaFactory.createForClass(Cms);
