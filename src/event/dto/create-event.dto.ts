import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EventStatus } from '../../common/mock/constant.mock';

export class CreateEventDTO implements Readonly<CreateEventDTO> {
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
}
