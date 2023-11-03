import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { createCustomerDto } from './dto/create-customer.dto';
import { Company } from 'src/company/company.entity';
import { updateCustomerDto } from './dto/update-customer.dto';
import { errorSend } from 'src/utils/errorSend';
import { CompanyProduct } from 'src/company-product/company-product.entity';
import { Product } from 'src/product/product.entity';
import { PaymentsQuotas } from 'src/payments-quotas/payments-quotas.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(CompanyProduct)
    private readonly companyProductRepository: Repository<CompanyProduct>,
  ) {}

  async findOne(id: number) {
    const finder: any = await this.customerRepository.findOne({
      where: { id },
    });
    if (!finder) {
      return errorSend(1, 'No existe el cliente');
    }
    const findCompany = await this.companyRepository.find({
      where: { customer: id },
    });
    const data = {
      ...finder,
      company: findCompany,
    };
    return { data };
  }

  async obtainAll() {
    const res = await this.customerRepository.find({
      relations: [
        'customerType',
        'customerStatus',
        'customerSubStatus',
        'company',
      ],
      order: {
        created: 'DESC',
      },
    });
    return res;
  }

  async findAll(value: string) {
    // const customer = this.customerRepository
    //   .createQueryBuilder('customer')
    //   .leftJoinAndSelect('customer.user_id', 'user')
    //   .where(
    //     'first_name LIKE :value\
    //     OR last_name LIKE :value\
    //     OR email LIKE :value',
    //     {
    //       value: `%${value}%`,
    //     },
    //   )
    //   .getMany();

    const customer: any = this.customerRepository.find({
      where: [
        {
          first_name: Like(`%${value}%`),
        },
        {
          last_name: Like(`%${value}%`),
        },
        {
          email: Like(`%${value}%`),
        },
      ],
      relations: ['user_id'],
    });
    return (await customer).map((data) => {
      data.user_id = data.user_id.id;
      return data;
    });
  }
  async uploadImgPerfil(file: string) {
    const account = 'matchpadel';
    const accountKey =
      'L3YN0VvVEgCKlRi1cuBMcNB4PfSzVVSHNevEKysZgM7Ts4kxDIgy9pgYL+OC2Ynkoq4y5YQq4cCRAq7aAKZusQ==';

    const sharedKeyCredential = new StorageSharedKeyCredential(
      account,
      accountKey,
    );
    const pathBlobCore = `https://${account}.blob.core.windows.net`;
    const blobServiceClient = new BlobServiceClient(
      pathBlobCore,
      sharedKeyCredential,
    );

    const containerName = 'perfil';

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const m = /^data:(.+?);base64,(.+)$/.exec(file);
    const [_, content_type, file_base64] = m;
    console.log('content_type', content_type);
    const blobName =
      'mp-' + new Date().getTime() + '.' + content_type.split('/')[1];

    const blobFile = Buffer.from(file_base64, 'base64');
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.uploadData(blobFile);

    console.log(
      `Upload block blob ${blobName} successfully`,
      uploadBlobResponse.requestId,
    );

    return {
      uploadBlobResponse,
      url: pathBlobCore + '/perfil/' + blobName,
    };
  }

  async create(dto: createCustomerDto) {
    const newItem = new Customer();
    newItem.name = dto.name;
    newItem.email = dto.email;
    newItem.phone = dto.phone;
    newItem.img = dto.img;
    newItem.customerType = dto.customerType;
    newItem.customerStatus = dto.customerStatus;
    newItem.customerSubStatus = dto.customerSubStatus;
    newItem.preCustomer = dto.preClientId;
    const res = await this.customerRepository.save(newItem);

    let resCompany = null;
    if (dto.companyTitle) {
      const newCompany = new Company();
      newCompany.title = dto.companyTitle;
      newCompany.img = dto.companyImg;
      newCompany.instagram = dto.companyInstagram;
      newCompany.customer = res.id;
      resCompany = await this.companyRepository.save(newCompany);
    }

    const resProducts = [];
    if (dto.products) {
      await Promise.all(
        dto.products.map(async (item) => {
          const newCProduct = new CompanyProduct();
          newCProduct.company = resCompany.id;
          newCProduct.product = item.product;
          newCProduct.title = item.description;
          const resProd = await this.companyProductRepository.save(newCProduct);
          resProducts.push(resProd);
        }),
      );
    }

    const resQuotas = [];
    if (dto.paymentQuotas) {
      await Promise.all(
        dto.paymentQuotas.map(async (item) => {
          const newCProduct = new PaymentsQuotas();
          newCProduct.customer = newItem.id;
          newCProduct.date = item.date;
          newCProduct.poisiton = item.position;
          const resPay = await this.companyProductRepository.save(newCProduct);
          resQuotas.push(resPay);
        }),
      );
    }

    return { res, resCompany, resProducts };
  }

  async update(dto: updateCustomerDto) {
    const toUpdate = await this.customerRepository.findOne(dto.id);
    if (!toUpdate) {
      return errorSend(1, 'El ID del cliente no existe');
    }
    toUpdate.name = dto.name;
    toUpdate.email = dto.email;
    toUpdate.phone = dto.phone;
    toUpdate.img = dto.img;
    toUpdate.customerType = dto.customerType;
    toUpdate.customerStatus = dto.customerStatus;
    toUpdate.customerSubStatus = dto.customerSubStatus;
    const res = await this.customerRepository.save(toUpdate);
    return res;
  }
  async remove(id) {
    const finder = await this.customerRepository.findOne(id);
    if (!finder) {
      return errorSend(1, 'El ID de usuario no existe');
    }

    const finderCompany = await this.companyRepository.find({
      where: { customer: id },
    });
    const resCompany = await this.companyRepository.remove(finderCompany);
    const res = await this.customerRepository.remove(finder);
    return { res, resCompany };
  }
}
