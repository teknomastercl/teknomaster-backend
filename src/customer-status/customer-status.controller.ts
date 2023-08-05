import { Controller, Get } from '@nestjs/common';
import { CustomerStatusService } from './customer-status.service';

@Controller('customer-status')
export class CustomerStatusController {
  constructor(private readonly customerStatusService: CustomerStatusService) {}

  @Get()
  async findAll() {
    const res = await this.customerStatusService.findAll();
    return {
      data: res,
    };
  }
}
