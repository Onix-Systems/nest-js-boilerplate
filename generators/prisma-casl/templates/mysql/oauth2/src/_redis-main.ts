// registers aliases, DON'T REMOVE THIS LINE!
import 'module-alias/register';

import redisStore from 'connect-redis';
import * as redis from 'redis';
import passport from 'passport';
import session from 'express-session';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import AppModule from './modules/app/app.module';

import {
  BadRequestExceptionFilter,
  UnauthorizedExceptionFilter,
  ForbiddenExceptionFilter,
  NotFoundExceptionFilter,
  AllExceptionsFilter,
} from './filters';

const redisClient = redis.createClient({
  legacyMode: true,
  url: process.env.REDIS_URL,
});
redisClient.connect();
const RedisStore = redisStore(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new UnauthorizedExceptionFilter(),
    new ForbiddenExceptionFilter(),
    new BadRequestExceptionFilter(),
    new NotFoundExceptionFilter(),
  );

  app.use(
    session({
      secret: configService.get<string>('PASSPORT_SESSION_SECRET') as string,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT') as unknown as number,
        client: redisClient,
        ttl: 666,
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const options = new DocumentBuilder()
    .setTitle('Api v1')
    .setDescription('The boilerplate API for nestjs devs')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('SERVER_PORT') || 3000;

  await app.listen(port, async () => {
    console.log(`The server is running on ${port} port: http://localhost:${port}/api`);
  });
}
bootstrap();
