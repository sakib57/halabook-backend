import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { SearchQueryDTO } from '../../../common/dto/searchquery.dto';

export class StateSearchQueryDTO extends SearchQueryDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  country: string;
}
