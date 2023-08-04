import { Module } from '@nestjs/common';
import { CustomerSubStatusController } from './customer-sub-status.controller';
import { CustomerSubStatusService } from './customer-sub-status.service';

@Module({
  controllers: [CustomerSubStatusController],
  providers: [CustomerSubStatusService],
})
export class CustomerSubStatusModule {}
