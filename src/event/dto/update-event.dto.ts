import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDTO implements Readonly<UpdateEventDTO> {
  @ApiProperty()
  comment: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;
}
