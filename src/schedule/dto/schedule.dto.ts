import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ScheduleStatus } from '../../common/mock/constant.mock';

export class ScheduleDTO implements Readonly<ScheduleDTO> {
  @ApiProperty()
  timeFrom: number;

  @ApiProperty()
  timeTo: number;

  @ApiProperty()
  date: number;

  @ApiProperty()
  user: string;

  @ApiProperty({ enum: ScheduleStatus })
  @IsEnum(ScheduleStatus)
  status: ScheduleStatus;

  @ApiProperty()
  comment: string;

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
