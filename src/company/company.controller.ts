import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/editFileName';
import { imageFileFilter } from 'src/utils/imageFileFilter';
import config from 'src/config';

const direction = `/img/company/`;
const hostImg = `${config.STORAGE}/public${direction}`;
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Get()
  async findAll() {
    const data = await this.companyService.findAll();
    return {
      data,
    };
  }

  @Get('/:id')
  async findById(@Param('id') id) {
    const data = await this.companyService.findById(id);
    return {
      data,
    };
  }

  @Get('/user/:id')
  async findByUserId(@Param('id') id) {
    const data = await this.companyService.findByUserId(id);
    return {
      data,
    };
  }

  @Post()
  async create(@Body() item) {
    const data = await this.companyService.create(item);
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
    const response = {
      originalname: file.originalname,
      filename: file.filename,
      url: 'http://' + config.HOST_IP + direction + file.filename,
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
