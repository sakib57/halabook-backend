import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaloonServiceDTO implements Readonly<SaloonServiceDTO> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsMongoId()
  category: string;

  @ApiProperty()
  @IsMongoId()
  saloonProfile: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  isActive: boolean;

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
