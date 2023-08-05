import { Module } from '@nestjs/common';
import { CustomerSubStatusController } from './customer-sub-status.controller';
import { CustomerSubStatusService } from './customer-sub-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerSubStatus } from './customer-sub-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerSubStatus])],
  controllers: [CustomerSubStatusController],
  providers: [CustomerSubStatusService],
})
export class CustomerSubStatusModule {}
