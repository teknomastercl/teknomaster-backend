import { Controller, Get } from '@nestjs/common';
import { ProductStatusService } from './product-status.service';

@Controller('product-status')
export class ProductStatusController {
  constructor(private readonly productStatusService: ProductStatusService) {}

  @Get()
  async findAll() {
    const res = await this.productStatusService.findAll();
    return {
      data: res,
    };
  }
}
