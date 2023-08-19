import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CustomerController } from './customer/customer.controller';

@Module({
  controllers: [ProductController, CustomerController],
  providers: [ProductService]
})
export class ProductModule {}
