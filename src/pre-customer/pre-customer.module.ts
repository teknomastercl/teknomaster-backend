import { Module } from '@nestjs/common';
import { PreCustomerController } from './pre-customer.controller';
import { PreCustomerService } from './pre-customer.service';
import { PreCustomer } from './pre-customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreCustomerProduct } from 'src/pre-customer-product/pre-customer-product.entity';
import { Product } from 'src/product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PreCustomer, PreCustomerProduct, Product]),
  ],
  controllers: [PreCustomerController],
  providers: [PreCustomerService],
})
export class PreCustomerModule {}
