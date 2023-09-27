import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ENV } from './config';

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
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://backoffice.teknomaster.cl',
      'https://teknomaster.cl',
      'https://www.teknomaster.cl',
      'http://localhost:3500',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  const port = ENV === 'development' ? 3500 : 80;
  await app.listen(process.env.PORT || port);
}
bootstrap();
