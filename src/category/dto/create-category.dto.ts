import {
  IsString,
  MaxLength,
  MinLength,
  IsArray,
  IsEnum,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryType } from '../../common/mock/constant.mock';

export class CreateCategoryDTO implements Readonly<CreateCategoryDTO> {
  @ApiProperty()
  @MaxLength(30)
  @MinLength(3)
  @IsString()
  name: string;

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
  pictures: [string];
}
