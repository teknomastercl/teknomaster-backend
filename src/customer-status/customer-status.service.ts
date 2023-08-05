import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerStatus } from './customer-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerStatusService {
  constructor(
    @InjectRepository(CustomerStatus)
    private readonly customerStatusRepository: Repository<CustomerStatus>,
  ) {}

  async findAll() {
    const res = this.customerStatusRepository.find();
    return res;
  }
}
