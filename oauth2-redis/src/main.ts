// registers aliases, DON'T REMOVE THIS LINE!
import 'module-alias/register';

import * as redisStore from 'connect-redis';
import * as redis from 'redis';
import * as passport from 'passport';
import * as session from 'express-session';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import AppModule from '@components/app/app.module';

const redisClient = redis.createClient();
const RedisStore = redisStore(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: process.env.PASSPORT_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({
        host: 'redis',
        port: 6379,
        client: redisClient,
        ttl: 666,
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const port = process.env.SERVER_PORT || 3000;

  await app.listen(port, () => console.log(`The server is running on ${port} port`));
}
bootstrap();
