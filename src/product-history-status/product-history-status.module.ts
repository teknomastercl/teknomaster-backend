import { Module } from '@nestjs/common';
import { ProductHistoryStatusController } from './product-history-status.controller';
import { ProductHistoryStatusService } from './product-history-status.service';

@Module({
  controllers: [ProductHistoryStatusController],
  providers: [ProductHistoryStatusService]
})
export class ProductHistoryStatusModule {}
