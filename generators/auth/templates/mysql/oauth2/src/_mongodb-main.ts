// registers aliases, DON'T REMOVE THIS LINE!
import 'module-alias/register';

import passport from 'passport';
import session from 'express-session';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import AppModule from './routes/app/app.module';

import AllExceptionsFilter from '@filters/all-exception.filter';

const MongoDBStore = require('connect-mongodb-session')(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(
    session({
      secret: configService.get<string>('PASSPORT_SESSION_SECRET') as string,
      resave: false,
      saveUninitialized: false,
      store: new MongoDBStore({
        uri: configService.get<string>('MONGODB_URL'),
        collection: 'sessions',
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
