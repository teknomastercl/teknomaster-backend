import { Module } from '@nestjs/common';
import { ProductStatusService } from './product-status.service';
import { ProductStatusController } from './product-status.controller';

@Module({
  providers: [ProductStatusService],
  controllers: [ProductStatusController]
})
export class ProductStatusModule {}
