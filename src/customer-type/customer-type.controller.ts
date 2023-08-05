import { Controller, Get } from '@nestjs/common';
import { CustomerTypeService } from './customer-type.service';

@Controller('customer-type')
export class CustomerTypeController {
  constructor(private readonly customerTypeService: CustomerTypeService) {}

  @Get()
  async findAll() {
    const res = await this.customerTypeService.findAll();
    return {
      data: res,
    };
  }
}
