import { Module } from '@nestjs/common';
import { CustomerHistoryStatusController } from './customer-history-status.controller';
import { CustomerHistoryStatusService } from './customer-history-status.service';

@Module({
  controllers: [CustomerHistoryStatusController],
  providers: [CustomerHistoryStatusService]
})
export class CustomerHistoryStatusModule {}
