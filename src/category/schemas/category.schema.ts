import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class Category {
  @Prop({
    minlength: 3,
    maxlength: 30,
  })
  name: string;

  @Prop({
    minlength: 3,
    maxlength: 40,
  })
  nameSlug: string;

  @Prop({
    unique: true,
    minlength: 3,
    maxlength: 40,
  })
  slug: string;

  @Prop()
  type: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Category',
  })
  parentCategory: CategoryDocument;

  @Prop()
  logo: string;

  @Prop({
    type: [],
    default: undefined,
  })
  pictures: [];

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

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.index({ nameSlug: 1, parentCategory: 1 }, { unique: true });

CategorySchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    return {
      _id: ret._id,
      name: ret.name,
      slug: ret.slug,
      type: ret.type,
      parentCategory: ret.parentCategory,
      logo: ret.logo,
      pictures: ret.pictures,
      isActive: ret.isActive,
      isDeleted: ret.isDeleted,
    };
  },
});
