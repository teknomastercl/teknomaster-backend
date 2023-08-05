import { Module } from '@nestjs/common';
import { CustomerStatusController } from './customer-status.controller';
import { CustomerStatusService } from './customer-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerStatus } from './customer-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerStatus])],
  controllers: [CustomerStatusController],
  providers: [CustomerStatusService],
})
export class CustomerStatusModule {}
