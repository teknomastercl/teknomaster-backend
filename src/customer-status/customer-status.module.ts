import { Module } from '@nestjs/common';
import { CustomerStatusController } from './customer-status.controller';
import { CustomerStatusService } from './customer-status.service';

@Module({
  controllers: [CustomerStatusController],
  providers: [CustomerStatusService],
})
export class CustomerStatusModule {}
