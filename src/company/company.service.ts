import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { errorSend } from 'src/utils/errorSend';
@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async findAll() {
    const item = await this.companyRepository.find();
    return item;
  }
  async findById(id) {
    const item = await this.companyRepository.findOne({ id });
    return item;
  }
  async findByCustomerId(id) {
    const item = await this.companyRepository.find({ where: { customer: id } });
    return item;
  }
  async create(item) {
    const finder = await this.companyRepository.findOne({
      where: { customer: item.customer },
    });
    if (!finder) {
      return errorSend(1, 'No existe el cliente');
    }

    const send = new Company();
    send.title = item.title;
    send.img = item.img;
    send.email = item.email;
    send.phone = item.phone;
    send.instagram = item.instagram;
    send.customer = item.customer;
    const saved = await this.companyRepository.save(send);
    return { data: saved };
  }
  async update(dto) {
    const finder = await this.companyRepository.findOne(dto.id);
    if (!finder) {
      return errorSend(1, 'El ID de producto no existe');
    }
    finder.title = dto.title;
    finder.email = dto.email;
    finder.phone = dto.phone;
    finder.instagram = dto.instagram;
    finder.img = dto.img;
    const res = await this.companyRepository.save(finder);
    return { data: res };
  }
}
