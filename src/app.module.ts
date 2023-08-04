import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { UserModule } from './users/users.module';
import { CustomerModule } from './customer/customer.module';
import config from './config';
import { CompanyModule } from './company/company.module';
import { CustomerStatusModule } from './customer-status/customer-status.module';
import { CustomerSubStatusModule } from './customer-sub-status/customer-sub-status.module';
import { CustomerHistoryStatusModule } from './customer-history-status/customer-history-status.module';
import { CustomerHistorySubStatusModule } from './customer-history-sub-status/customer-history-sub-status.module';
import { CustomerTypeModule } from './customer-type/customer-type.module';

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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
