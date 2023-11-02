import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PreCustomerService } from './pre-customer.service';
import { createPreCustomerDto } from './dto/create-pre-customer.dto';
import { updatePreCustomerDto } from './dto/update-pre-customer.dto';

@Controller('pre-customer')
export class PreCustomerController {
  constructor(private readonly service: PreCustomerService) {}

  @Get('/:id')
  async findOne(@Param('id') id) {
    const data = await this.service.findOne(id);
    return data;
  }

  @Get()
  async obtainAll() {
    return await this.service.obtainAll();
  }

  @Post()
  async create(@Body() dto: createPreCustomerDto) {
    return await this.service.create(dto);
  }

  @Put()
  async update(@Body() dto: updatePreCustomerDto) {
    return await this.service.update(dto);
  }
}
