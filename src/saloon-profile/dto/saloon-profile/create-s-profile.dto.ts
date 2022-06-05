import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { LocationDTO } from '../../../common/dto';

export class CreateSProfileDTO implements Readonly<CreateSProfileDTO> {
  @ApiProperty()
  @MaxLength(150)
  @MinLength(3)
  @IsString()
  name: string;

  @ApiProperty()
  @MaxLength(5000)
  @MinLength(3)
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: LocationDTO,
  })
  @Type(() => LocationDTO)
  location: LocationDTO;
}
