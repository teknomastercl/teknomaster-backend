import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PreCustomerProduct } from './pre-customer-product.entity';
import { Repository } from 'typeorm';
import { errorSend } from 'src/utils/errorSend';

@Injectable()
export class PreCustomerProductService {
  constructor(
    @InjectRepository(PreCustomerProduct)
    private readonly repository: Repository<PreCustomerProduct>,
  ) {}
  async findByPreCustomer(id) {
    const item = await this.repository.find({
      where: { preCustomer: id },
      relations: ['product'],
    });
    return item;
  }

  async update(dto) {
    const finder = await this.repository.findOne(dto.id);
    if (!finder) {
      return errorSend(1, 'El ID del posible cliente no existe');
    }
    finder.description = dto.description;
    finder.product = dto.product;
    const res = await this.repository.save(finder);
    return { data: res };
  }
}
