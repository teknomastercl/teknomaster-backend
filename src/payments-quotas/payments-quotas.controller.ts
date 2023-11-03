import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PaymentsQuotasService } from './payments-quotas.service';

@Controller('payments-quotas')
export class PaymentsQuotasController {
  constructor(private readonly service: PaymentsQuotasService) {}

  @Get('/:id')
  async obtainByCustomer(@Param('id') id) {
    return await this.service.obtainByCustomer(id);
  }

  @Post()
  async create(@Body() dto) {
    return await this.service.create(dto);
  }

  @Put()
  async update(@Body() dto) {
    return await this.service.update(dto);
  }
}
