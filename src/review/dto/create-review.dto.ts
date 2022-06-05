import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDTO implements Readonly<CreateReviewDTO> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  saloonProfile: string;

  @ApiProperty()
  @IsString()
  merchant: string;

  @ApiProperty()
  @IsString()
  customer: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  booking: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  review: string;

  @ApiProperty()
  @IsString()
  reply: string;

  @ApiProperty()
  @IsNotEmpty()
  rating: string;

  @ApiProperty()
  pictures: string[];

  @ApiProperty()
  helpfulCount: number;
}
