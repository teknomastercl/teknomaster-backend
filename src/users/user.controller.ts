import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginUserDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UploadDeviceDto } from './dto/upload-device.dto';
import { UserRO } from './user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
    const _user = await this.userService.findOne(loginUserDto);

    if (!_user) {
      return {
        error: {
          message: 'Usuario no existe',
          code: 401,
        },
        user: null,
      };
    }

    const token = await this.userService.generateJWT(_user);
    const { email, id } = _user;
    const user = { email, token, id };
    return { user };
  }

  @Post('token')
  async token(@Body('token') token: string) {
    const response = await this.userService.verifyJWT(token);
    return response;
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body('user') userData: CreateUserDto) {
    const response = await this.userService.create(userData);
    return response;
  }

  @Post('device')
  async updateDevice(@Body() device: UploadDeviceDto) {
    const response = await this.userService.uploadDevice(device);
    return response;
  }
}
