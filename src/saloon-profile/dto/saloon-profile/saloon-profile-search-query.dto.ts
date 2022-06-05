import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { SearchQueryDTO } from '../../../common/dto/searchquery.dto';

export class SProfileSearchQueryDTO extends SearchQueryDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  categories: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  city: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  state: string;

  @ApiProperty({ required: false })
  @IsOptional()
  select: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  notIn: string[];
}
