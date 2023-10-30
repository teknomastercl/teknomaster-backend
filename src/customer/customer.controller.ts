import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { createCustomerDto } from './dto/create-customer.dto';
import { updateCustomerDto } from './dto/update-customer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/editFileName';
import { imageFileFilter } from 'src/utils/imageFileFilter';
import config, { ENV } from 'src/config';

const direction = `/customer/img/`;
const hostImg = `${config.STORAGE}/public${direction}`;
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/:id')
  async findOne(@Param('id') id) {
    const data = await this.customerService.findOne(id);
    return data;
  }

  @Get()
  async obtainAll() {
    const data = await this.customerService.obtainAll();
    return { data };
  }

  @Post()
  async create(@Body() dto: createCustomerDto) {
    const data = await this.customerService.create(dto);
    return { data };
  }

  @Put()
  async update(@Body() dto: updateCustomerDto) {
    const data = await this.customerService.update(dto);
    return { data };
  }

  @Delete('/:id')
  async remove(@Param('id') id) {
    const data = await this.customerService.remove(id);
    return { data };
  }

  @Get('search')
  async findAll(@Query() params) {
    const data = await this.customerService.findAll(params.value);
    return { data };
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
    console.log('file', file);
    const PORT = ENV === 'development' ? ':3500' : '';
    const response = {
      originalname: file.originalname,
      filename: file.filename,
      url: config.HOST_IP + PORT + direction + file.filename,
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
