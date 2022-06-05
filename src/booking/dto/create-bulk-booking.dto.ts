import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Status } from 'src/common/mock/constant.mock';
import { Type } from 'class-transformer';

class MakeBookingDTO implements Readonly<MakeBookingDTO> {
  @ApiProperty()
  @IsMongoId()
  merchant: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  service: string;

  @ApiProperty()
  @IsNotEmpty()
  requestDate: number;

  @ApiProperty()
  @IsNotEmpty()
  requestSlot: number;

  @ApiProperty()
  interval: number;
}

export class CreateBulkBookingDTO implements Readonly<CreateBulkBookingDTO> {
  @ApiProperty()
  @IsNotEmpty()
  saloonProfile: string;

  @ApiProperty()
  @IsEmail()
  customer: string;

  @ApiProperty({ enum: Status })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    type: MakeBookingDTO,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MakeBookingDTO)
  bookings: [MakeBookingDTO];
}
