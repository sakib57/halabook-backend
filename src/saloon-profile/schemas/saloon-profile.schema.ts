import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { WorkScheduleDocument, WorkScheduleSchema } from './schedule.schema';
import { CategoryDocument } from '../../category/schemas/category.schema';
import {
  LocationDocument,
  LocationSchema,
  MobileDocument,
  MobileSchema,
  SocialDocument,
  SocialSchema,
} from '../../common/schemas';

export type SaloonProfileDocument = SaloonProfile & Document;

@Schema({
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class SaloonProfile {
  @Prop({
    minlength: 3,
    maxlength: 150,
  })
  name: string;

  @Prop({
    minlength: 3,
    maxlength: 170,
  })
  nameSlug: string;

  @Prop({
    unique: true,
    minlength: 3,
    maxlength: 10,
  })
  slug: string;

  @Prop({
    minlength: 3,
    maxlength: 5000,
  })
  description: string;

  @Prop({
    type: LocationSchema,
  })
  location: LocationDocument;

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Category',
    required: true,
  })
  categories: CategoryDocument[];

  @Prop()
  thumbnail: string;

  @Prop({
    type: [],
    default: undefined,
  })
  pictures: string[];

  @Prop({
    type: [],
    default: undefined,
  })
  videos: string[];

  @Prop()
  email: string;

  @Prop({
    type: MobileSchema,
  })
  mobile: MobileDocument;

  // @Prop({
  //   type: [CompensationSchema],
  //   default: undefined,
  // })
  // compensations: CompensationDocument[];

  @Prop({
    type: [WorkScheduleSchema],
    default: undefined,
  })
  workSchedules: WorkScheduleDocument[];

  @Prop({
    type: [SocialSchema],
    default: undefined,
  })
  socials: SocialDocument[];

  @Prop({ default: 0 })
  viewCount: number;

  @Prop()
  ratings: number;

  @Prop({ default: 0 })
  profilePercentage: number;

  @Prop({ default: false })
  isSubscribed: boolean;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: false })
  isVerified: boolean;

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

export const SaloonProfileSchema = SchemaFactory.createForClass(SaloonProfile);

SaloonProfileSchema.virtual('merchants', {
  ref: 'Merchant',
  localField: '_id',
  foreignField: 'saloonProfile',
  options: { sort: { name: 1 } },
  match: { isActive: true, isDeleted: false },
});

SaloonProfileSchema.virtual('services', {
  ref: 'SaloonService',
  localField: '_id',
  foreignField: 'saloonProfile',
  options: { sort: { name: 1 } },
  match: { isActive: true, isDeleted: false },
});

SaloonProfileSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'saloonProfile',
});

SaloonProfileSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    return {
      _id: ret._id,
      name: ret.name,
      slug: ret.slug,
      description: ret.description,
      location: ret.location,
      categories: ret.categories,
      services: ret.services,
      thumbnail: ret.thumbnail,
      pictures: ret.pictures,
      videos: ret.videos,
      email: ret.email,
      mobile: ret.mobile,
      // compensations: ret.compensations,
      workSchedules: ret.workSchedules,
      socials: ret.socials,
      viewCount: ret.viewCount,
      reviews: ret.reviews,
      ratings: ret.ratings,
      profilePercentage: ret.profilePercentage,
      isSubscribed: ret.isSubscribed,
      merchants: ret.merchants,
      isVerified: ret.isVerified,
      isActive: ret.isActive,
      isDeleted: ret.isDeleted,
    };
  },
});
