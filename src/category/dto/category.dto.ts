import {
  IsString,
  MaxLength,
  MinLength,
  IsMongoId,
  IsArray,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryType } from '../../common/mock/constant.mock';

export class CategoryDTO implements Readonly<CategoryDTO> {
  @ApiProperty()
  @MaxLength(30)
  @MinLength(3)
  @IsString()
  name: string;

  @ApiProperty()
  @MaxLength(40)
  @MinLength(3)
  @IsString()
  nameSlug: string;

  @ApiProperty()
  @MaxLength(40)
  @MinLength(3)
  @IsString()
  slug: string;

  @ApiProperty()
  @IsEnum(CategoryType)
  type: string;

  @ApiProperty()
  @IsMongoId()
  parentCategory: string;

  @ApiProperty()
  logo: string;

  @ApiProperty()
  @IsArray()
  pictures: string[];

  @ApiProperty({ default: true })
  isActive: boolean;

  @ApiProperty({ default: false })
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
