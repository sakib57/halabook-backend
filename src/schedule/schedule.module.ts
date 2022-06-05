import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleController } from './controllers/schedule.controller';
import { ScheduleService } from './services/schedule.service';
import { ScheduleSchema } from './schema/schedule.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Schedule', schema: ScheduleSchema }]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
