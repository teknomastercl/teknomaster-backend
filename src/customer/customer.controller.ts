import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './dto/update-user.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/:id')
  async findOne(@Param('id') id) {
    const customer = await this.customerService.findOne(id);
    return { customer };
  }

  @Get('search')
  async findAll(@Query() params) {
    const customers = await this.customerService.findAll(params.value);
    return { customers };
  }
  @Post('update')
  async update(@Body() dto: UpdateCustomerDto) {
    return await this.customerService.update(dto);
  }
}
