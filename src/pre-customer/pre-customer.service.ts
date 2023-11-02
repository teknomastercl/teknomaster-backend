import { Injectable } from '@nestjs/common';
import { PreCustomer } from './pre-customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createPreCustomerDto } from './dto/create-pre-customer.dto';
import { updatePreCustomerDto } from './dto/update-pre-customer.dto';
import { PreCustomerProduct } from 'src/pre-customer-product/pre-customer-product.entity';
import { errorSend } from 'src/utils/errorSend';

@Injectable()
export class PreCustomerService {
  constructor(
    @InjectRepository(PreCustomer)
    private readonly repository: Repository<PreCustomer>,
    @InjectRepository(PreCustomerProduct)
    private readonly preCustomerProductRepository: Repository<PreCustomerProduct>,
  ) {}

  async findOne(id: number) {
    const finder: any = await this.repository.findOne({
      where: { id },
    });

    if (!finder) {
      return errorSend(1, 'No existe el posible cliente');
    }

    const resCP = await this.preCustomerProductRepository.find({
      where: { preCustomer: finder },
      relations: ['product'],
    });

    return {
      data: {
        ...finder,
        products: resCP,
      },
    };
  }

  async obtainAll() {
    const res = await this.repository.find({
      order: {
        created: 'DESC',
      },
    });

    const send = [];
    await Promise.all(
      res.map(async (item) => {
        const resCP = await this.preCustomerProductRepository.find({
          where: { preCustomer: item.id },
        });
        send.push({
          ...item,
          products: resCP,
        });
      }),
    );

    return { data: send };
  }

  async create(dto: createPreCustomerDto) {
    const newItem = new PreCustomer();
    newItem.name = dto.name;
    newItem.phone = dto.phone;
    newItem.instagram = dto.instagram;
    newItem.email = dto.email;
    newItem.reference = dto.reference;
    newItem.comment = dto.comment;
    const res = await this.repository.save(newItem);

    const resProducts = [];
    if (dto.products) {
      await Promise.all(
        dto.products.map(async (e) => {
          const newProduct = new PreCustomerProduct();
          newProduct.preCustomer = res;
          newProduct.product = e.product;
          newProduct.description = e.description;
          resProducts.push(
            await this.preCustomerProductRepository.save(newProduct),
          );
        }),
      );
    }
    return { data: { res, resProducts } };
  }

  async update(dto: updatePreCustomerDto) {
    const item = await this.repository.findOne({
      where: { id: dto.id },
    });
    if (!item) {
      return errorSend(1, 'El ID del posible cliente no existe');
    }
    item.name = dto.name;
    item.phone = dto.phone;
    item.instagram = dto.instagram;
    item.email = dto.email;
    item.reference = dto.reference;
    item.comment = dto.comment;
    const res = await this.repository.save(item);
    return { data: res };
  }
}
