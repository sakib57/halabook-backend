import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { SaloonProfileDocument } from 'src/saloon-profile/schemas';
import { CategoryDocument } from '../../category/schemas/category.schema';

export type SaloonServiceDocument = SaloonService & Document;

@Schema()
export class SaloonService {
  @Prop({
    minlength: 3,
    maxlength: 30,
  })
  name: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: CategoryDocument;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'SaloonProfile',
    required: true,
  })
  saloonProfile: SaloonProfileDocument;

  @Prop({
    require: true,
  })
  price: number;

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

export const SaloonServiceSchema = SchemaFactory.createForClass(SaloonService);

SaloonServiceSchema.index({ name: 1, category: 1 }, { unique: true });

SaloonServiceSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    return {
      _id: ret._id,
      name: ret.name,
      category: ret.category,
      saloonProfile: ret.saloonProfile,
      price: ret.price,
      isActive: ret.isActive,
      isDeleted: ret.isDeleted,
      cBy: ret.cBy,
      uBy: ret.uBy,
    };
  },
});
