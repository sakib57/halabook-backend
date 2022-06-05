import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDTO } from './create-category.dto';

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {
  @ApiProperty({ default: false })
  isDeleted: boolean;
}
