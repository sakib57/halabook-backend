import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EventStatus } from '../../common/mock/constant.mock';

export class EventDTO implements Readonly<EventDTO> {
  @ApiProperty()
  dateFrom: number;

  @ApiProperty()
  dateTo: number;

  @ApiProperty()
  saloonProfile: string;

  @ApiProperty({ enum: EventStatus })
  @IsEnum(EventStatus)
  status: EventStatus;

  @ApiProperty()
  comment: string;

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
