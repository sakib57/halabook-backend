import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingController } from './controllers/booking.controller';
import { BookingService } from './services/booking.service';
import { BookingSchema } from './schemas/booking.schema';
import { ScheduleService } from 'src/schedule/services/schedule.service';
import { ScheduleSchema } from 'src/schedule/schema/schedule.schema';
import { MerchantSchema } from 'src/saloon-profile/schemas';
import { UserSchema } from 'src/user/schemas/user.schema';
import { UserProfileService, UsersService } from 'src/user/services';
import { UserProfileSchema } from 'src/user/schemas/user-profile.schema';
import { AwsS3Service } from 'src/aws/services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Booking', schema: BookingSchema },
      { name: 'Schedule', schema: ScheduleSchema },
      { name: 'Merchant', schema: MerchantSchema },
      { name: 'User', schema: UserSchema },
      { name: 'UserProfile', schema: UserProfileSchema },
    ]),
  ],
  controllers: [BookingController],
  providers: [
    BookingService,
    ScheduleService,
    UsersService,
    UserProfileService,
    AwsS3Service,
  ],
})
export class BookingModule {}
