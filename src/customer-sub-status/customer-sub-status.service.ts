import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerSubStatus } from './customer-sub-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerSubStatusService {
  constructor(
    @InjectRepository(CustomerSubStatus)
    private readonly customerSubStatusRepository: Repository<CustomerSubStatus>,
  ) {}

  async findAll() {
    const res = this.customerSubStatusRepository.find({
      relations: ['customerStatus'],
    });
    return res;
  }
  async findOne(id) {
    const res = this.customerSubStatusRepository.find(id);
    return res;
  }
}
