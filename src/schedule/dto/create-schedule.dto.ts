import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ScheduleStatus } from '../../common/mock/constant.mock';

export class CreateScheduleDTO implements Readonly<CreateScheduleDTO> {
  @ApiProperty()
  user: string;

  @ApiProperty()
  timeFrom: number;

  @ApiProperty()
  timeTo: number;

  @ApiProperty()
  date: number;

  @ApiProperty({ enum: ScheduleStatus })
  @IsEnum(ScheduleStatus)
  status: ScheduleStatus;

  @ApiProperty()
  comment: string;
}
