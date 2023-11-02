import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { PreCustomerProductService } from './pre-customer-product.service';

@Controller('pre-customer-product')
export class PreCustomerProductController {
  constructor(private readonly service: PreCustomerProductService) {}

  @Get('/pre-customer/:id')
  async findByUserId(@Param('id') id) {
    const data = await this.service.findByPreCustomer(id);
    return {
      data,
    };
  }

  @Put()
  async update(@Body() dto) {
    const data = await this.service.update(dto);
    return data;
  }
}
