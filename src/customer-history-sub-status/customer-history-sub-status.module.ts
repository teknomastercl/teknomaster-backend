import { Module } from '@nestjs/common';
import { CustomerHistorySubStatusController } from './customer-history-sub-status.controller';
import { CustomerHistorySubStatusService } from './customer-history-sub-status.service';

@Module({
  controllers: [CustomerHistorySubStatusController],
  providers: [CustomerHistorySubStatusService],
})
export class CustomerHistorySubStatusModule {}
