import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductStatus } from './product-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductStatusService {
  constructor(
    @InjectRepository(ProductStatus)
    private readonly productStatusRepository: Repository<ProductStatus>,
  ) {}

  async findAll() {
    const res = this.productStatusRepository.find();
    return res;
  }
}
