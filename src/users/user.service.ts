import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
import config from '../config';
import { Users } from './users.entity';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';
import { Customer } from '../customer/customer.entity';
import { UploadDeviceDto } from './dto/upload-device.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findOne({ email, password }: LoginUserDto): Promise<Users> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      return null;
    }

    if (await argon2.verify(user.password, password)) {
      return user;
    }

    return null;
  }
  public generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      config.SECRET,
    );
  }

  async verifyJWT(token) {
    return jwt.verify(token, config.SECRET);
  }

  async create(dto: CreateUserDto) {
    // check uniqueness of username/email
    const { email, password } = dto;
    const qb = await getRepository(Users)
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    const user = await qb.getOne();

    if (user) {
      return { error: 'El correo ya existe' };
    }

    // create new user
    const newUser = new Users();
    newUser.email = email;
    newUser.password = password;
    newUser.created = new Date().toString();

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.userRepository.save(newUser);
      const savedCustomer = await this.createCustomer(savedUser.id, dto);
      const generateToken = await this.generateJWT({
        email: savedUser.email,
        id: savedUser.id,
      });
      console.log('generateToken', savedUser);
      console.log('generateToken', generateToken);
      return {
        data: {
          savedUser,
          savedCustomer,
          token: generateToken,
        },
      };
    }
  }
  private async createCustomer(userId: number, dto: CreateUserDto) {
    const newCustomer = new Customer();
    newCustomer.user_id = userId;
    newCustomer.first_name = dto.firstName;
    newCustomer.last_name = dto.lastName;
    newCustomer.email = dto.email;
    newCustomer.phone = dto.phone;

    const errors = await validate(newCustomer);
    if (errors.length > 0) {
      const _errors = { username: 'Customerinput is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedCustomer = await this.customerRepository.save(newCustomer);
      return savedCustomer;
    }
  }
  async uploadDevice(device: UploadDeviceDto) {
    const toUpdate = await this.userRepository.findOne(device.userId);
    delete toUpdate.password;

    const updated = Object.assign(toUpdate, {
      deviceToken: device.deviceToken,
      deviceType: device.deviceType,
    });
    return await this.userRepository.save(updated);
  }
}
