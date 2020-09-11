// registers aliases, DON'T REMOVE THIS LINE!
import 'module-alias/register';

import * as passport from 'passport';
import * as session from 'express-session';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import AppModule from '@components/app/app.module';
import AllExceptionsFilter from '@filters/allException.filter';

const MySQLStore = require('express-mysql-session')(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(
    session({
      secret: process.env.PASSPORT_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MySQLStore({
        host: 'mysql',
        port: 3306,
        user: 'root',
        password: '1234',
        database: 'app',
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

  const port = process.env.SERVER_PORT || 3000;

  await app.listen(port, () => console.log(`The server is running on ${port} port`));
}
bootstrap();
