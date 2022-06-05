import { ICmsBase } from './cms-base.interface';
import { ITestimonial } from './testimonial.interface';
import { IFooter } from './footer.interface';

export interface ICms {
  readonly _id: string;
  readonly banners: ICmsBase[];
  readonly mobileApp: ICmsBase;
  readonly business: ICmsBase;
  readonly aboutUs: ICmsBase;
  readonly whyUs: ICmsBase;
  readonly testimonials: ITestimonial[];
  readonly subscription: ICmsBase;
  readonly footer: IFooter;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
}
