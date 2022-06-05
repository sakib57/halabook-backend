import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SearchQueryDTO } from 'src/common/dto/searchquery.dto';

export class FilterBookingDTO extends SearchQueryDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  merchants: string[];
}
