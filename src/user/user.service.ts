import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
import config from '../config';
import { User } from './user.entity';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Customer } from '../customer/customer.entity';
import { UploadDeviceDto } from './dto/upload-device.dto';
import { errorSend } from 'src/utils/errorSend';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async login({ email, password }: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      return null;
    }

    if (await argon2.verify(user.password, password)) {
      delete user.password;
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
    return jwt.verify(token, config.SECRET, (err, res) => {
      if (err) {
        return errorSend(1, 'Token falso');
      } else {
        return { data: res };
      }
    });
  }

  async create(dto: CreateUserDto) {
    const finder = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (finder) {
      return errorSend(1, 'El corroe ya existe');
    }

    const newItem = new User();
    newItem.email = dto.email;
    newItem.password = dto.password;
    newItem.first_name = dto.first_name;
    newItem.last_name = dto.last_name;
    newItem.phone = dto.phone;
    newItem.img = dto.img;
    newItem.userType = dto.userType;

    const res = await this.userRepository.save(newItem);
    const generateToken = await this.generateJWT({
      email: res.email,
      id: res.id,
    });
    return {
      data: res,
      token: generateToken,
    };
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
