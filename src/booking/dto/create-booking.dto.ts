import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { Status } from 'src/common/mock/constant.mock';

export class CreateBookingDTO implements Readonly<CreateBookingDTO> {
  @ApiProperty()
  @IsNotEmpty()
  saloonProfile: string;

  @ApiProperty()
  @IsMongoId()
  merchant: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  service: string;

  @ApiProperty()
  @IsEmail()
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
}
