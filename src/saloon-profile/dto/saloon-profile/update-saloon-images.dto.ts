import { ApiProperty } from '@nestjs/swagger';

export class SaloonImageUploadDTO implements Readonly<SaloonImageUploadDTO> {
  @ApiProperty({ type: 'string', format: 'binary' })
  thumbnail: Express.Multer.File;

  @ApiProperty({ type: 'string', format: 'binary' })
  pictures: Express.Multer.File[];

  @ApiProperty({ type: 'string', format: 'binary' })
  videos: Express.Multer.File[];
}
