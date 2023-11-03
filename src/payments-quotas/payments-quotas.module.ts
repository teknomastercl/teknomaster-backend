import { Module } from '@nestjs/common';
import { PaymentsQuotasController } from './payments-quotas.controller';
import { PaymentsQuotasService } from './payments-quotas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsQuotas } from './payments-quotas.entity';
import { Customer } from 'src/customer/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentsQuotas, Customer])],
  controllers: [PaymentsQuotasController],
  providers: [PaymentsQuotasService],
})
export class PaymentsQuotasModule {}
