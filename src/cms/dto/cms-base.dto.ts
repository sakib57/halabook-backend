import {
  IsArray,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Button } from '../schemas/button.schema';
import { ButtonDTO } from './button.dto';

export class CmsBaseDTO implements Readonly<CmsBaseDTO> {
  @ApiProperty()
  @IsString()
  headline: string;

  @ApiProperty()
  @MaxLength(30)
  @MinLength(3)
  @IsString()
  title: string;

  @ApiProperty()
  @MaxLength(3000)
  @MinLength(3)
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsArray()
  contents: string[];

  @ApiProperty({
    type: ButtonDTO,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ButtonDTO)
  buttons: [Button];

  @ApiProperty({ default: false })
  isDeleted: boolean;
}
