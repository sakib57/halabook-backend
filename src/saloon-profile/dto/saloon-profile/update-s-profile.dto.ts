import {
  IsString,
  MaxLength,
  MinLength,
  IsArray,
  ValidateNested,
  IsEmail,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { LocationDTO, MobileDTO, SocialDTO } from '../../../common/dto';
import { Location, Mobile, Social } from '../../../common/schemas';
import { CompensationDTO } from './compensation.dto';
import { Compensation } from '../../schemas/compensation.schema';
import { WorkScheduleDTO } from './schedule.dto';
import { WorkSchedule } from '../../schemas/schedule.schema';
import { SaloonServiceDTO } from '../saloon-service/saloon-service.dto';
import { SaloonService } from 'src/saloon-profile/schemas/saloon-service.schema';

export class UpdateSProfileDTO implements Readonly<UpdateSProfileDTO> {
  @ApiProperty()
  @MaxLength(150)
  @MinLength(3)
  @IsString()
  name: string;

  @ApiProperty()
  @MaxLength(5000)
  @MinLength(3)
  @IsString()
  description: string;

  @ApiProperty({
    type: LocationDTO,
  })
  @Type(() => LocationDTO)
  location: LocationDTO;

  @ApiProperty({
    type: SaloonServiceDTO,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaloonServiceDTO)
  services: [SaloonService];

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
    type: [SocialDTO],
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => SocialDTO)
  socials: [Social];

  @ApiProperty()
  @IsArray()
  categories: [];

  @ApiProperty({ default: 0 })
  profilePercentage: number;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
