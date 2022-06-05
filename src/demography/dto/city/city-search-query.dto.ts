import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { SearchQueryDTO } from '../../../common/dto/searchquery.dto';

export class CitySearchQueryDTO extends SearchQueryDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  country: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  state: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cityname: string;
}
