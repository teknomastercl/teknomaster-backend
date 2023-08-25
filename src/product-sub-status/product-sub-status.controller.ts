import { Controller, Get } from '@nestjs/common';
import { ProductSubStatusService } from './product-sub-status.service';

@Controller('product-sub-status')
export class ProductSubStatusController {
  constructor(
    private readonly productSubStatusService: ProductSubStatusService,
  ) {}

  @Get()
  async findAll() {
    const res = await this.productSubStatusService.findAll();
    return {
      data: res,
    };
  }
}
