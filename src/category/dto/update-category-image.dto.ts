import { ApiProperty } from '@nestjs/swagger';

export class CategoryImageUploadDTO
  implements Readonly<CategoryImageUploadDTO>
{
  @ApiProperty({ type: 'string', format: 'binary' })
  logo: Express.Multer.File;

  @ApiProperty({ type: 'string', format: 'binary' })
  pictures: Express.Multer.File[];

  @ApiProperty({ type: 'string', format: 'binary' })
  videos: Express.Multer.File[];
}
