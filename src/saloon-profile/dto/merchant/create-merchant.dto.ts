import { IsMongoId, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../../common/mock/constant.mock';

export class CreateMerchantDTO implements Readonly<CreateMerchantDTO> {
  @ApiProperty()
  @IsMongoId()
  merchant: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsMongoId()
  saloonProfile: string;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty({
    enum: Status,
  })
  @IsEnum(Status)
  status: Status;
}
