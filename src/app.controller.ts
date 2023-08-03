import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  findAll(): string {
    return 'Bienvenido a mi api de nestjs 🚀';
  }
}
