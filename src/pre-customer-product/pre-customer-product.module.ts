import { Module } from '@nestjs/common';
import { PreCustomerProductController } from './pre-customer-product.controller';
import { PreCustomerProductService } from './pre-customer-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreCustomer } from 'src/pre-customer/pre-customer.entity';
import { PreCustomerProduct } from './pre-customer-product.entity';
import { Product } from 'src/product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PreCustomer, PreCustomerProduct, Product]),
  ],
  controllers: [PreCustomerProductController],
  providers: [PreCustomerProductService],
})
export class PreCustomerProductModule {}
