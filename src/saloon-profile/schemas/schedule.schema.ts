import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkScheduleDocument = WorkSchedule & Document;

@Schema()
export class WorkSchedule {
  // availableFrom and availableTo represent timeslot
  // A given time will be entered in this block
  // i.e: 10*60*60*1000 means 10 AM
  // i.e: 22*60*60*1000 means 10 PM
  @Prop()
  availableFrom: number;

  @Prop()
  availableTo: number;

  @Prop()
  day: string;

  @Prop()
  workInterval: number;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const WorkScheduleSchema = SchemaFactory.createForClass(WorkSchedule);
