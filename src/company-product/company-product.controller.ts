import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CompanyProductService } from './company-product.service';

@Controller('company-product')
export class CompanyProductController {
  constructor(private readonly service: CompanyProductService) {}

  @Get('/:id')
  async findOne(@Param('id') id) {
    const data = await this.service.findOne(id);
    return { data };
  }
  @Get('/company/:id')
  async findByCompany(@Param('id') id) {
    const data = await this.service.findByCompany(id);
    return { data };
  }
  @Get('/history/:id')
  async findLastHistory(@Param('id') id) {
    const data = await this.service.findLastHistoryById(id);
    return { data };
  }
  @Get('/history-company/:id')
  async findLastHistoryByCompany(@Param('id') id) {
    const data = await this.service.findLastHistoryByCompany(id);
    return { data };
  }

  @Post()
  async create(@Body() dto) {
    const data = await this.service.create(dto);
    return { data };
  }

  @Put('/status')
  async changeStatus(@Body() dto) {
    const data = await this.service.changeStatus(dto);
    return { data };
  }
  @Put('/sub-status')
  async changeSubStatus(@Body() dto) {
    const data = await this.service.changeSubStatus(dto);
    return { data };
  }

  @Put()
  async update(@Body() dto) {
    const data = await this.service.update(dto);
    return data;
  }
}
