import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { createCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findOne(user_id: number) {
    const customer: any = await this.customerRepository.findOne({
      where: { user_id },
      relations: ['user_id'],
    });
    customer.user_id = customer.user_id.id;
    return customer;
  }

  async findAll(value: string) {
    // const customer = this.customerRepository
    //   .createQueryBuilder('customer')
    //   .leftJoinAndSelect('customer.user_id', 'users')
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
    newItem.first_name = dto.first_name;
    newItem.last_name = dto.last_name;
    newItem.email = dto.email;
    newItem.phone = dto.phone;
    newItem.instagram = dto.instagram;
    const customer = await this.customerRepository.save(newItem);
    return customer;
  }
}
