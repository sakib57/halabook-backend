import { IsMongoId, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Status } from '../../../common/mock/constant.mock';
import { WorkScheduleDTO } from '../saloon-profile/schedule.dto';
import { WorkSchedule } from '../../schemas/schedule.schema';
import { SaloonServiceDTO } from '../saloon-service/saloon-service.dto';
import { SaloonService } from 'src/saloon-profile/schemas/saloon-service.schema';

export class MerchantDTO implements Readonly<MerchantDTO> {
  @ApiProperty()
  @IsMongoId()
  merchant: string;

  @ApiProperty()
  @IsMongoId()
  saloonProfile: string;

  @ApiProperty({
    enum: Status,
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    type: SaloonServiceDTO,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaloonServiceDTO)
  services: [SaloonService];

  @ApiProperty({
    type: WorkScheduleDTO,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkScheduleDTO)
  workSchedules: [WorkSchedule];

  @ApiProperty()
  isOwner: boolean;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  isPaid: boolean;

  @ApiProperty()
  isActive: boolean;

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
