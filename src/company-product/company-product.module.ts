import { Module } from '@nestjs/common';
import { CompanyProductService } from './company-product.service';
import { CompanyProductController } from './company-product.controller';

@Module({
  providers: [CompanyProductService],
  controllers: [CompanyProductController]
})
export class CompanyProductModule {}
