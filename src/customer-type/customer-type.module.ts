import { Module } from '@nestjs/common';
import { CustomerTypeController } from './customer-type.controller';
import { CustomerTypeService } from './customer-type.service';
import { CustomerType } from './customer-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerType])],
  controllers: [CustomerTypeController],
  providers: [CustomerTypeService],
})
export class CustomerTypeModule {}
