import { Module } from '@nestjs/common';
import { ProductSubStatusController } from './product-sub-status.controller';
import { ProductSubStatusService } from './product-sub-status.service';
import { ProductSubStatus } from './product-sub-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSubStatus])],
  controllers: [ProductSubStatusController],
  providers: [ProductSubStatusService],
})
export class ProductSubStatusModule {}
