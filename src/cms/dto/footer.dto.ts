import { IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CmsBaseDTO } from './cms-base.dto';
import { Social } from '../../common/schemas';
import { SocialDTO } from '../../common/dto';

export class FooterDTO extends CmsBaseDTO implements Readonly<FooterDTO> {
  @ApiProperty({
    type: SocialDTO,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialDTO)
  socials: Social[];
}
