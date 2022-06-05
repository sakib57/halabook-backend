import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CmsBase } from './cms-base.schema';
import { SocialDocument, SocialSchema } from '../../common/schemas';

export type FooterDocument = Footer & Document;

@Schema()
export class Footer extends CmsBase {
  @Prop({
    type: [SocialSchema],
    default: undefined,
  })
  socials: SocialDocument[];
}

export const FooterSchema = SchemaFactory.createForClass(Footer);
