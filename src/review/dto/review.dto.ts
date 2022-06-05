import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReviewDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  user: string;

  @ApiProperty()
  @IsString()
  saloonProfile: string;

  @ApiProperty()
  @IsString()
  merchant: string;

  @ApiProperty()
  @IsString()
  customer: string;

  @ApiProperty()
  @IsString()
  booking: string;

  @ApiProperty()
  @IsString()
  review: string;

  @ApiProperty()
  @IsString()
  reply: string;

  @ApiProperty()
  rating: string;

  @ApiProperty()
  pictures: string[];

  @ApiProperty()
  helpfulCount: number;

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
