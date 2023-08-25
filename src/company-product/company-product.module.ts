import { Module } from '@nestjs/common';
import { CompanyProductService } from './company-product.service';
import { CompanyProductController } from './company-product.controller';
import { CompanyProduct } from './company-product.entity';
import { Product } from 'src/product/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductStatus } from 'src/product-status/product-status.entity';
import { ProductHistoryStatus } from 'src/product-history-status/product-history-status.entity';
import { ProductSubStatus } from 'src/product-sub-status/product-sub-status.entity';
import { ProductHistorySubStatus } from 'src/product-history-sub-status/product-history-sub-status.entity';
import { Company } from 'src/company/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      CompanyProduct,
      Product,
      ProductStatus,
      ProductSubStatus,
      ProductHistoryStatus,
      ProductHistorySubStatus,
    ]),
  ],
  providers: [CompanyProductService],
  controllers: [CompanyProductController],
})
export class CompanyProductModule {}
