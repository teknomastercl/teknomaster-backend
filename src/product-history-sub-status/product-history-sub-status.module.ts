import { Module } from '@nestjs/common';
import { ProductHistorySubStatusController } from './product-history-sub-status.controller';
import { ProductHistorySubStatusService } from './product-history-sub-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductHistorySubStatus } from './product-history-sub-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductHistorySubStatus])],
  controllers: [ProductHistorySubStatusController],
  providers: [ProductHistorySubStatusService],
})
export class ProductHistorySubStatusModule {}
