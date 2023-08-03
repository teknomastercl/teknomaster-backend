import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Get()
  async findAll() {
    const data = await this.companyService.findAll();
    return {
      data,
    };
  }

  @Get('/:id')
  async findById(@Param('id') id) {
    const data = await this.companyService.findById(id);
    return {
      data,
    };
  }

  @Get('/user/:id')
  async findByUserId(@Param('id') id) {
    const data = await this.companyService.findByUserId(id);
    return {
      data,
    };
  }

  @Post()
  async create(@Body() item) {
    const data = await this.companyService.create(item);
    return { data };
  }
}
