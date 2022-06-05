import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaloonProfileController, MerchantController } from './controllers';
import { SaloonProfileService, MerchantService } from './services';
import { AwsS3Service } from '../aws/services';
import { SaloonProfileSchema, MerchantSchema } from './schemas';
import { UserSchema } from '../user/schemas/user.schema';
import { SaloonServiceSchema } from './schemas/saloon-service.schema';
import { SaloonServiceController } from './controllers/saloon-service.controller';
import { SaloonServiceService } from './services/saloon-service.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SaloonProfile', schema: SaloonProfileSchema },
      { name: 'Merchant', schema: MerchantSchema },
      { name: 'User', schema: UserSchema },
      { name: 'SaloonService', schema: SaloonServiceSchema },
    ]),
  ],
  controllers: [
    SaloonProfileController,
    MerchantController,
    SaloonServiceController,
  ],
  providers: [
    SaloonProfileService,
    MerchantService,
    SaloonServiceService,
    AwsS3Service,
  ],
})
export class SaloonProfileModule {}
