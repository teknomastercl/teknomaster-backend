import { Injectable } from '@nestjs/common';
import { CustomerType } from './customer-type.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerTypeService {
  constructor(
    @InjectRepository(CustomerType)
    private readonly customerTypeRepository: Repository<CustomerType>,
  ) {}

  async findAll() {
    const res = this.customerTypeRepository.find();
    return res;
  }
}
