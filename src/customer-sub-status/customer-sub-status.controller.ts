import { Controller, Get, Query } from '@nestjs/common';
import { CustomerSubStatusService } from './customer-sub-status.service';

@Controller('customer-sub-status')
export class CustomerSubStatusController {
  constructor(
    private readonly customerSubStatusService: CustomerSubStatusService,
  ) {}

  @Get()
  async findAll() {
    const res = await this.customerSubStatusService.findAll();
    return {
      data: res,
    };
  }

  @Get('/:id')
  async findOne(@Query('id') id) {
    const res = await this.customerSubStatusService.findOne(id);
    return {
      data: res,
    };
  }
}
