import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TestimonialDTO implements Readonly<TestimonialDTO> {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  givenBy: string;

  @ApiProperty()
  @IsString()
  givenUserAvatar: string;

  @ApiProperty()
  @IsString()
  givenUserDesignation: string;

  @ApiProperty({ default: false })
  isDeleted: boolean;
}
