import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ButtonDTO implements Readonly<ButtonDTO> {
  @ApiProperty()
  @MaxLength(30)
  @MinLength(1)
  @IsString()
  text: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsString()
  icon: string;

  @ApiProperty({ default: false })
  isDeleted: boolean;
}
