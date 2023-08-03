import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { UserModule } from './users/users.module';
import { CustomerModule } from './customer/customer.module';
import config from './config';

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
    // CompanyModule,
    // ProductsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
