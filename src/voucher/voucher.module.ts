import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VoucherController } from './controller/voucher.controller';
import { VoucherService } from './services/voucher.service';
import { VoucherSchema } from './schemas/voucher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Voucher', schema: VoucherSchema }]),
  ],
  controllers: [VoucherController],
  providers: [VoucherService],
})
export class VoucherModule {}
