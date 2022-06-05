import {
  IsEnum,
  IsArray,
  ValidateNested,
  IsMongoId,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../../common/mock/constant.mock';
import { Type } from 'class-transformer';
import { WorkScheduleDTO } from '../saloon-profile/schedule.dto';
import { WorkSchedule } from '../../schemas/schedule.schema';
export class UpdateMerchantDTO implements Readonly<UpdateMerchantDTO> {
  @ApiProperty({
    enum: Status,
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  saloonProfile: string;

  // @ApiProperty({
  //   type: SaloonServiceDTO,
  // })
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => SaloonServiceDTO)
  // services: [SaloonService];

  @ApiProperty()
  @IsArray()
  services: [];

  @ApiProperty({
    type: WorkScheduleDTO,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkScheduleDTO)
  workSchedules: [WorkSchedule];

  @ApiProperty()
  isPaid: boolean;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;
}
