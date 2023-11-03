import { Injectable } from '@nestjs/common';
import { PaymentsQuotas } from './payments-quotas.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { errorSend } from 'src/utils/errorSend';

@Injectable()
export class PaymentsQuotasService {
  constructor(
    @InjectRepository(PaymentsQuotas)
    private readonly repository: Repository<PaymentsQuotas>,
  ) {}

  async obtainByCustomer(customer) {
    const res = await this.repository.find({
      where: { customer },
      order: {
        poisiton: 'ASC',
      },
    });
    return { data: res };
  }

  async create(dto) {
    const newItem = new PaymentsQuotas();
    newItem.customer = dto.customer;
    newItem.poisiton = dto.poisiton;
    newItem.date = dto.date;
    const res = await this.repository.save(newItem);
    return { data: { res } };
  }

  async update(dto) {
    const item = await this.repository.findOne({
      where: { id: dto.id },
    });
    if (!item) {
      return errorSend(1, 'El ID del pago no existe');
    }
    item.customer = dto.customer;
    item.poisiton = dto.poisiton;
    item.date = dto.date;
    const res = await this.repository.save(item);
    return { data: res };
  }
}
