// registers aliases, DON'T REMOVE THIS LINE!
import 'module-alias/register';

import flash from 'connect-flash';
import { engine } from 'express-handlebars';
import passport from 'passport';
import session from 'express-session';

import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { RolesEnum } from '@decorators/roles.decorator';

import AppModule from './modules/app/app.module';

import {
  BadRequestExceptionFilter,
  UnauthorizedExceptionFilter,
  ForbiddenExceptionFilter,
  NotFoundExceptionFilter,
  AllExceptionsFilter,
} from './filters';

const MongoDBStore = require('connect-mongodb-session')(session);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new UnauthorizedExceptionFilter(),
    new ForbiddenExceptionFilter(),
    new BadRequestExceptionFilter(),
    new NotFoundExceptionFilter(),
  );

  const viewsPath = join(__dirname, '../public/views');

  app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
      isAdmin: (roles: RolesEnum[]) => roles.includes(RolesEnum.ADMIN),
    },
  }));
  app.set('views', viewsPath);
  app.set('view engine', '.hbs');

  app.use(
    session({
      secret: configService.get<string>('PASSPORT_SESSION_SECRET') as string,
      resave: false,
      saveUninitialized: false,
      store: new MongoDBStore({
        uri: configService.get<string>('DATABASE_URL'),
        collection: 'sessions',
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

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
