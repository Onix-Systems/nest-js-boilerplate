// registers aliases, DON'T REMOVE THIS LINE!
import 'module-alias/register';

import flash from 'connect-flash';
import redisStore from 'connect-redis';
import redis from 'redis';
import exphbs from 'express-handlebars';
import passport from 'passport';
import session from 'express-session';

import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import AppModule from '@components/app/app.module';
import AppService from '@components/app/app.service';

import AllExceptionsFilter from '@filters/all-exceptions.filter';

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});
const RedisStore = redisStore(session);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  const viewsPath = join(__dirname, '../public/views');

  app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
  app.set('views', viewsPath);
  app.set('view engine', '.hbs');

  app.use(
    session({
      secret: process.env.PASSPORT_SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT as unknown as number,
        client: redisClient,
        ttl: 666,
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

  const port = process.env.SERVER_PORT || 3000;

  await app.listen(port, async () => {
    // eslint-disable-next-line no-console
    console.log(`The server is running on ${port} port: http://localhost:${port}/api`);
  });
}
bootstrap();
