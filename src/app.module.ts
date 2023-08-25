import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import config from './config';
import { CompanyModule } from './company/company.module';
import { CustomerStatusModule } from './customer-status/customer-status.module';
import { CustomerSubStatusModule } from './customer-sub-status/customer-sub-status.module';
import { CustomerHistoryStatusModule } from './customer-history-status/customer-history-status.module';
import { CustomerHistorySubStatusModule } from './customer-history-sub-status/customer-history-sub-status.module';
import { CustomerTypeModule } from './customer-type/customer-type.module';
import { CredentialModule } from './credential/credential.module';
import { ProductModule } from './product/product.module';
import { CompanyProductModule } from './company-product/company-product.module';
import { ProductStatusModule } from './product-status/product-status.module';
import { ProductSubStatusModule } from './product-sub-status/product-sub-status.module';
import { ProductHistoryStatusModule } from './product-history-status/product-history-status.module';
import { ProductHistorySubStatusModule } from './product-history-sub-status/product-history-sub-status.module';
import { TaskModule } from './task/task.module';
import { TaskListModule } from './task-list/task-list.module';
import { TaskStatusModule } from './task-status/task-status.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host: config.DB.host,
        port: 3306,
        username: config.DB.username,
        password: config.DB.password,
        database: config.DB.database,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    UserModule,
    CustomerModule,
    CustomerStatusModule,
    CompanyModule,
    CustomerSubStatusModule,
    CustomerHistoryStatusModule,
    CustomerHistorySubStatusModule,
    CustomerTypeModule,
    CredentialModule,
    ProductModule,
    CompanyProductModule,
    ProductStatusModule,
    ProductSubStatusModule,
    ProductHistoryStatusModule,
    ProductHistorySubStatusModule,
    TaskModule,
    TaskListModule,
    TaskStatusModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
