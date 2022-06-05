import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AwsS3Service } from 'src/aws/services';
import { CmsController } from './controllers/cms.controller';
import { CmsSchema } from './schemas/cms.schema';
import { CmsService } from './services/cms.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cms', schema: CmsSchema }])],
  controllers: [CmsController],
  providers: [CmsService, AwsS3Service],
})
export class CmsModule {}
