// registers aliases, DON'T REMOVE THIS LINE!
import 'module-alias/register';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import AppModule from '@components/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
