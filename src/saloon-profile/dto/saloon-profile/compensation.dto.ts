import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompensationDTO implements Readonly<CompensationDTO> {
  @ApiProperty()
  service: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  @MaxLength(200)
  @MinLength(3)
  @IsString()
  quotes: string;

  @ApiProperty()
  isPriceFixed: boolean;

  @ApiProperty()
  isDeleted: boolean;
}
