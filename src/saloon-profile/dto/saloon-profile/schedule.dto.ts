import { ApiProperty } from '@nestjs/swagger';

export class WorkScheduleDTO implements Readonly<WorkScheduleDTO> {
  @ApiProperty()
  availableFrom: number;

  @ApiProperty()
  availableTo: number;

  @ApiProperty()
  day: string;

  @ApiProperty()
  workInterval: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;
}
