import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateReviewDTO implements Readonly<UpdateReviewDTO> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  review: string;

  @ApiProperty()
  @IsString()
  reply: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  pictures: string[];
}
