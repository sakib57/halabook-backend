import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MerchantDTO } from 'src/saloon-profile/dto/merchant';
import { SaloonProfileDTO } from 'src/saloon-profile/dto/saloon-profile';
import { Merchant, SaloonProfile } from 'src/saloon-profile/schemas';

export class SearchReviewDTO implements Readonly<SearchReviewDTO> {
  @ApiProperty({
    type: SaloonProfileDTO,
  })
  @Type(() => SaloonProfileDTO)
  saloonProfile: SaloonProfile;

  @ApiProperty({
    type: MerchantDTO,
  })
  @Type(() => MerchantDTO)
  merchant: Merchant;
}
