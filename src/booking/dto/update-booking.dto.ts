import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/common/mock/constant.mock';

export class UpdateBookingDTO implements Readonly<UpdateBookingDTO> {
  @ApiProperty()
  @IsNotEmpty()
  merchant: string;

  @ApiProperty()
  @IsNotEmpty()
  requestDate: number;

  @ApiProperty()
  @IsNotEmpty()
  requestSlot: number;

  @ApiProperty()
  interval: number;

  @ApiProperty({ enum: Status })
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;
}
