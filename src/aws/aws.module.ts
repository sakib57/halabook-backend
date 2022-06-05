import { Module } from '@nestjs/common';
import { AwsS3Controller } from './controllers';
import { AwsS3Service } from './services';

@Module({
  controllers: [AwsS3Controller],
  providers: [AwsS3Service],
})
export class AwsModule {}
