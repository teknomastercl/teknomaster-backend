import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { Company } from 'src/company/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Company])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
