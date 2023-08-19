import { Module } from '@nestjs/common';
import { ProductHistorySubStatusController } from './product-history-sub-status.controller';
import { ProductHistorySubStatusService } from './product-history-sub-status.service';

@Module({
  controllers: [ProductHistorySubStatusController],
  providers: [ProductHistorySubStatusService]
})
export class ProductHistorySubStatusModule {}
