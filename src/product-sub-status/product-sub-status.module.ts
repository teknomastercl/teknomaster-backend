import { Module } from '@nestjs/common';
import { ProductSubStatusController } from './product-sub-status.controller';
import { ProductSubStatusService } from './product-sub-status.service';

@Module({
  controllers: [ProductSubStatusController],
  providers: [ProductSubStatusService]
})
export class ProductSubStatusModule {}
