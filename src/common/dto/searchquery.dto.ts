import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

function ToBoolean() {
  return Transform((v) => ['1', 1, 'true', true].includes(v.value));
}
export class SearchQueryDTO implements Readonly<SearchQueryDTO> {
  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  skip: number;

  @ApiProperty({
    required: false,
  })
  @ToBoolean()
  @IsBoolean()
  @IsOptional()
  noCondition: boolean;

  @IsOptional()
  @IsString()
  status: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  type: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  saloonProfile: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  user: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @ToBoolean()
  pagination: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @ToBoolean()
  isActive: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @ToBoolean()
  isVerified: boolean;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  state: string;

  @ApiProperty({ required: false })
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  notIn: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  categories: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  service: string;

  @ApiProperty({ required: false })
  @IsOptional()
  distance: number;

  @ApiProperty({ required: false })
  @IsOptional()
  lat: number;

  @ApiProperty({ required: false })
  @IsOptional()
  lng: number;
}
