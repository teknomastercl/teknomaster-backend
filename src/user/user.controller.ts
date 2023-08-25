import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginUserDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UploadDeviceDto } from './dto/upload-device.dto';
import { UserService } from './user.service';
import { errorSend } from 'src/utils/errorSend';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/editFileName';
import { imageFileFilter } from 'src/utils/imageFileFilter';
import config, { ENV } from 'src/config';

const direction = `/user/img/`;
const hostImg = `${config.STORAGE}/public${direction}`;
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const finder = await this.userService.login(dto);

    if (!finder) {
      return errorSend(1, 'Las credenciales no coinciden');
    }

    const token = await this.userService.generateJWT(finder);
    // delete finder.password;
    return { data: finder, token };
  }

  @Post('token')
  async token(@Body('token') token: string) {
    const response = await this.userService.verifyJWT(token);
    return response;
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() userData: CreateUserDto) {
    const response = await this.userService.create(userData);
    return response;
  }

  @Post('device')
  async updateDevice(@Body() device: UploadDeviceDto) {
    const response = await this.userService.uploadDevice(device);
    return response;
  }

  @Post('img')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: hostImg,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const PORT = ENV === 'development' ? ':3500' : '';
    const response = {
      originalname: file.originalname,
      filename: file.filename,
      url: 'http://' + config.HOST_IP + PORT + direction + file.filename,
    };
    return { data: response };
  }

  @Get('img/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, {
      root: hostImg,
    });
  }
}
