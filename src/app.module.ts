import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpErrorFilter } from './common/filters/http-error.filter';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { DemographyModule } from './demography/demography.module';
import { AwsModule } from './aws/aws.module';
import { SaloonProfileModule } from './saloon-profile/saloon-profile.module';
import { BookingModule } from './booking/booking.module';
import { ReviewModule } from './review/review.module';
import { ScheduleModule } from './schedule/schedule.module';
import { EmailModule } from './email/email.module';
import { CleanModule } from './clean/clean.module';
import { EventModule } from './event/event.module';
import { CmsModule } from './cms/cms.module';
import { VoucherModule } from './voucher/voucher.module';
import 'dotenv/config';

const DB_CONNECTION = process.env.DB_CONNECTION;

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(DB_CONNECTION),
    UserModule,
    AuthModule,
    EmailModule,
    CategoryModule,
    DemographyModule,
    AwsModule,
    SaloonProfileModule,
    BookingModule,
    ReviewModule,
    ScheduleModule,
    CleanModule,
    EventModule,
    CmsModule,
    VoucherModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
