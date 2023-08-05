import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
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
    const item = await this.companyRepository.find({ id });
    return item;
  }
  async findByUserId(id) {
    const item = await this.companyRepository.find({ where: { customer: id } });
    return item;
  }
  async create(item) {
    const finder = await this.companyRepository.find({
      where: { customer: item.customer },
    });
    if (finder.length > 0) {
      return { error: 'Ya eres administrador de una empresa' };
    }

    const send = new Company();
    send.title = item.title;
    send.img = item.img;
    send.customer = item.customer;
    const saved = await this.companyRepository.save(send);
    return saved;
  }
}
