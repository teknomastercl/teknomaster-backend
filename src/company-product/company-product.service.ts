import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyProduct } from './company-product.entity';
import { Repository } from 'typeorm';
import { errorSend } from 'src/utils/errorSend';
import { ProductSubStatus } from 'src/product-sub-status/product-sub-status.entity';
import { createCompanyProductDto } from './dto/create-company-product.dto';
import { ProductHistoryStatus } from 'src/product-history-status/product-history-status.entity';
import { changeStatusDto } from './dto/change-status.dto';
import { Company } from 'src/company/company.entity';

@Injectable()
export class CompanyProductService {
  constructor(
    @InjectRepository(CompanyProduct)
    private readonly repository: Repository<CompanyProduct>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(ProductSubStatus)
    private readonly productSubStatusRepository: Repository<ProductSubStatus>,
    @InjectRepository(ProductHistoryStatus)
    private readonly productHistoryStatusRepository: Repository<ProductHistoryStatus>,
  ) {}
  async findOne(id: number) {
    const send: any = await this.repository.findOne({
      where: { id: id },
      relations: ['product', 'productStatus', 'productSubStatus'],
    });
    return send;
  }
  async findByCompany(id: number) {
    const send: any = await this.repository.find({
      where: { company: id },
      relations: ['product', 'productStatus', 'productSubStatus'],
    });
    return send;
  }
  async obtainAll() {
    const send = this.repository.find();
    return send;
  }

  async create(dto: createCompanyProductDto) {
    const newItem = new CompanyProduct();
    newItem.title = dto.title;
    newItem.product = dto.product;
    newItem.company = dto.company;
    newItem.productStatus = dto.productStatus;
    newItem.productSubStatus = dto.productSubStatus;
    const res = await this.repository.save(newItem);
    return res;
  }

  async changeStatus(dto: changeStatusDto) {
    const send: any = await this.repository.findOne({
      where: { id: dto.id },
    });
    if (!send) {
      return errorSend(1, 'No se econtró el producto');
    }

    const findSub = await this.productSubStatusRepository.find({
      where: { productStatus: dto.productStatus },
    });
    if (findSub.length > 0) {
      send.productSubStatus = findSub[0].id;
    }
    send.productStatus = dto.productStatus;
    const res = await this.repository.save(send);

    const newLog = new ProductHistoryStatus();
    newLog.note = dto.note;
    newLog.date = dto.date;
    newLog.companyProduct = res.id;
    newLog.productStatus = dto.productStatus;
    newLog.productSubStatus = send.productSubStatus;
    await this.productHistoryStatusRepository.save(newLog);

    return res;
  }
  async changeSubStatus(dto: changeStatusDto) {
    const send: any = await this.repository.findOne({
      where: { id: dto.id },
      relations: ['productStatus'],
    });
    const productStatusInitial = send.productStatus;
    if (!send) {
      return errorSend(1, 'No se econtró el producto');
    }
    send.productSubStatus = dto.productSubStatus;
    const res = await this.repository.save(send);

    const newLog = new ProductHistoryStatus();
    newLog.note = dto.note;
    newLog.date = dto.date;
    newLog.companyProduct = res.id;
    newLog.productStatus = productStatusInitial;
    newLog.productSubStatus = send.productSubStatus;
    await this.productHistoryStatusRepository.save(newLog);

    return res;
  }
  async update(dto) {
    const finder = await this.repository.findOne(dto.id);
    if (!finder) {
      return errorSend(1, 'El ID de producto no existe');
    }
    finder.title = dto.title;
    finder.product = dto.product;
    const res = await this.repository.save(finder);
    return res;
  }
  async findLastHistoryById(id) {
    const finder = await this.repository.find({
      where: { id },
    });
    if (finder.length < 1) {
      return errorSend(1, 'No tienes al menos un producto creado');
    }
    const firstItem = finder[0];

    const res = await this.productHistoryStatusRepository.find({
      where: { companyProduct: firstItem.id },
      order: {
        id: 'DESC',
      },
    });
    if (res.length < 1) {
      return errorSend(
        3,
        'Te falta tener almenos un cambio de estado registrado',
      );
    }
    const firstCP = res[0];
    return firstCP;
  }
  async findLastHistoryByCompany(company) {
    const finderCompany = await this.companyRepository.findOne(company);
    if (!finderCompany) {
      return errorSend(1, 'La empresa no existe');
    }
    const finder = await this.repository.find({
      where: { company },
    });
    if (finder.length < 1) {
      return errorSend(2, 'No tienes al menos un producto creado');
    }
    const firstItem = finder[0];

    const res = await this.productHistoryStatusRepository.find({
      where: { companyProduct: firstItem.id },
      order: {
        id: 'DESC',
      },
    });
    if (res.length < 1) {
      return errorSend(
        3,
        'Te falta tener almenos un cambio de estado registrado',
      );
    }
    const firstCP = res[0];
    return firstCP;
  }
}
