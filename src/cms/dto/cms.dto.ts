import { IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CmsBase } from '../schemas/cms-base.schema';
import { CmsBaseDTO } from './cms-base.dto';
import { Testimonial } from '../schemas/testimonial.schema';
import { TestimonialDTO } from './testimonial.dto';
import { Footer } from '../schemas/footer.schema';
import { FooterDTO } from './footer.dto';

export class CmsDTO implements Readonly<CmsDTO> {
  @ApiProperty({
    type: CmsBaseDTO,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CmsBaseDTO)
  banners: CmsBase[];

  @ApiProperty({
    type: CmsBaseDTO,
  })
  @Type(() => CmsBaseDTO)
  mobileApp: CmsBase;

  @ApiProperty({
    type: CmsBaseDTO,
  })
  @Type(() => CmsBaseDTO)
  business: CmsBase;

  @ApiProperty({
    type: CmsBaseDTO,
  })
  @Type(() => CmsBaseDTO)
  aboutUs: CmsBase;

  @ApiProperty({
    type: CmsBaseDTO,
  })
  @Type(() => CmsBaseDTO)
  whyUs: CmsBase;

  @ApiProperty({
    type: TestimonialDTO,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestimonialDTO)
  testimonials: Testimonial[];

  @ApiProperty({
    type: CmsBaseDTO,
  })
  @Type(() => CmsBaseDTO)
  subscription: CmsBase;

  @ApiProperty({
    type: FooterDTO,
  })
  @Type(() => FooterDTO)
  footer: Footer;

  cTime: number;
  cBy: string;
  uTime: number;
  uBy: string;
}
