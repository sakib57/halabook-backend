import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSaloonServiceDTO
  implements Readonly<UpdateSaloonServiceDTO>
{
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsMongoId()
  category: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;
}
