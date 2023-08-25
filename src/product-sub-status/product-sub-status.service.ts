import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSubStatus } from './product-sub-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductSubStatusService {
  constructor(
    @InjectRepository(ProductSubStatus)
    private readonly repository: Repository<ProductSubStatus>,
  ) {}

  async findAll() {
    const res = this.repository.find({
      relations: ['productStatus'],
    });
    return res;
  }
}
