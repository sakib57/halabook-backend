import {
  IsString,
  MaxLength,
  MinLength,
  IsMongoId,
  IsArray,
  ValidateNested,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { LocationDTO, MobileDTO, SocialDTO } from '../../../common/dto';
import { Location, Mobile, Social } from '../../../common/schemas';
import { WorkSchedule } from '../../schemas/schedule.schema';
import { WorkScheduleDTO } from './schedule.dto';

export class SaloonProfileDTO implements Readonly<SaloonProfileDTO> {
  @ApiProperty()
  @MaxLength(150)
  @MinLength(3)
  @IsString()
  name: string;

  @ApiProperty()
  @MaxLength(170)
  @MinLength(3)
  @IsString()
  nameSlug: string;

  @ApiProperty()
  @MaxLength(10)
  @MinLength(3)
  @IsString()
  slug: string;

  @ApiProperty()
  @MaxLength(5000)
  @MinLength(3)
  @IsString()
  description: string;

  @ApiProperty({
    type: LocationDTO,
  })
  @Type(() => LocationDTO)
  location: Location;

  @ApiProperty()
  @IsMongoId()
  categories: string;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  @IsArray()
  pictures: string[];

  @ApiProperty()
  @IsArray()
  videos: string[];

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: MobileDTO,
  })
  @Type(() => MobileDTO)
  mobile: Mobile;

  // @ApiProperty({
  //   type: CompensationDTO,
  // })
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CompensationDTO)
  // compensations: [Compensation];

  @ApiProperty({
    type: WorkScheduleDTO,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkScheduleDTO)
  workSchedules: [WorkSchedule];

  @ApiProperty({
    type: SocialDTO,
  })
  @ValidateNested({ each: true })
  @Type(() => SocialDTO)
  socials: [Social];

  @ApiProperty()
  viewCount: number;

  @ApiProperty()
  profilePercentage: number;

  @ApiProperty()
  ratings: number;

  @ApiProperty()
  isSubscribed: boolean;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isVerified: boolean;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  cTime: number;

  @ApiProperty()
  cBy: string;

  @ApiProperty()
  uTime: number;

  @ApiProperty()
  uBy: string;
}
