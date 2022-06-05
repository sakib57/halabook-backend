import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CleanController } from './clean.controller';
import { CleanService } from './clean.service';
import { MerchantSchema, SaloonProfileSchema } from '../saloon-profile/schemas';
import { UserProfileSchema } from '../user/schemas/user-profile.schema';
import { UserSchema } from '../user/schemas/user.schema';
import { CategorySchema } from '../category/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SaloonProfile', schema: SaloonProfileSchema },
      { name: 'Merchant', schema: MerchantSchema },
      { name: 'User', schema: UserSchema },
      { name: 'UserProfile', schema: UserProfileSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
  ],
  controllers: [CleanController],
  providers: [CleanService],
})
export class CleanModule {}
