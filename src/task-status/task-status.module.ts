import { Module } from '@nestjs/common';
import { TaskStatusController } from './task-status.controller';
import { TaskStatusService } from './task-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskStatus])],
  controllers: [TaskStatusController],
  providers: [TaskStatusService],
})
export class TaskStatusModule {}
