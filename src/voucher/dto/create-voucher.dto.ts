import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VoucherType } from '../../common/mock/constant.mock';

export class CreateVoucherDTO implements Readonly<CreateVoucherDTO> {
  @ApiProperty()
  code: string;

  @ApiProperty()
  activeTime: number;

  @ApiProperty()
  expireTime: number;

  @ApiProperty({ enum: VoucherType })
  @IsEnum(VoucherType)
  amountType: VoucherType;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  maxAmountLimit: number;

  @ApiProperty()
  minimumSpending: number;

  @ApiProperty()
  promotionalText: string;

  @ApiProperty()
  isActive: boolean;
}
