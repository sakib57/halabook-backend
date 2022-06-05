import { ApiProperty } from '@nestjs/swagger';

export class UpdateScheduleDTO implements Readonly<UpdateScheduleDTO> {
  @ApiProperty()
  comment: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;
}
