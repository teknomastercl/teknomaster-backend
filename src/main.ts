import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ENV } from './config';
import * as fs from 'fs';

// const httpsOptions = {
//   key: fs.readFileSync('../certificados/server.key'),
//   cert: fs.readFileSync('./certificados/certificate.crt'),
//   ca: [fs.readFileSync('./certificados/ca_bundle.crt')],
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create(AppModule, {httpsOptions});
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.enableCors();
  const port = ENV === 'development' ? 3500 : 3000;
  await app.listen(process.env.PORT || port);
}
bootstrap();
