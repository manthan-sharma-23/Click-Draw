import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json({ limit: '50mb' })); // Adjust size as per your requirement
  app.use(bodyParser.urlencoded({ extended: true })); // Adjust size as per your requirement

  await app.listen(3200);
}

bootstrap();
