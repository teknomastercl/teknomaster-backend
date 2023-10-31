import { Controller, Get } from '@nestjs/common';
import config from './config';

@Controller('')
export class AppController {
  @Get()
  findAll(): string {
    return `Bienvenido a la api de Tekno Master en ambiente ${config.ENV}🚀`;
  }
}
