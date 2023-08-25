import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/editFileName';
import { imageFileFilter } from 'src/utils/imageFileFilter';
import config, { ENV } from 'src/config';

const direction = `/company/img/`;
const hostImg = `${config.STORAGE}/public${direction}`;
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }
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

  @Get('/customer/:id')
  async findByUserId(@Param('id') id) {
    const data = await this.companyService.findByCustomerId(id);
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

  @Put()
  async update(@Body() dto) {
    const data = await this.companyService.update(dto);
    return data;
  }
}
