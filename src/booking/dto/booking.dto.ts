import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { Status } from 'src/common/mock/constant.mock';

export class BookingDTO implements Readonly<BookingDTO> {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  saloonProfile: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  merchant: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  service: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  customer: string;

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

  @ApiProperty()
  cTime: number;

  @ApiProperty()
  uTime: number;
}
