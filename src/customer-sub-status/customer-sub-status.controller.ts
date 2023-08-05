import { Controller, Get } from '@nestjs/common';
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
}
