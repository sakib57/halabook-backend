import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsBoolean,
} from 'class-validator';

export class AuthDTO {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  readonly password: string;

  @IsBoolean()
  readonly isMerchant: boolean;

  @IsBoolean()
  readonly isAdmin: boolean;
}
