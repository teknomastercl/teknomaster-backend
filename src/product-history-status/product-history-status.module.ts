import { Module } from '@nestjs/common';
import { ProductHistoryStatusController } from './product-history-status.controller';
import { ProductHistoryStatusService } from './product-history-status.service';
import { ProductHistoryStatus } from './product-history-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductHistoryStatus])],
  controllers: [ProductHistoryStatusController],
  providers: [ProductHistoryStatusService],
})
export class ProductHistoryStatusModule {}
