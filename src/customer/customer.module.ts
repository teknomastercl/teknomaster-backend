import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { Company } from 'src/company/company.entity';
import { CompanyProduct } from 'src/company-product/company-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Company, CompanyProduct])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
