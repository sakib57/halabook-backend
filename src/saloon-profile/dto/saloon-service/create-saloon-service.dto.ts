import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSaloonServiceDTO
  implements Readonly<CreateSaloonServiceDTO>
{
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsMongoId()
  category: string;

  @ApiProperty()
  @IsMongoId()
  saloonProfile: string;

  @ApiProperty()
  price: number;
}
