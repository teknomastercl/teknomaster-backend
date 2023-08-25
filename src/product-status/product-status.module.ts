import { Module } from '@nestjs/common';
import { ProductStatusService } from './product-status.service';
import { ProductStatusController } from './product-status.controller';
import { ProductStatus } from './product-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductStatus])],
  providers: [ProductStatusService],
  controllers: [ProductStatusController],
})
export class ProductStatusModule {}
