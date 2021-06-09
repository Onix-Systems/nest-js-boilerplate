import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { RouterModule } from 'nest-router';

import HomeModuleV1 from '@components/v1/home/home.module';
import AuthModuleV1 from '@components/v1/auth/auth.module';
import UsersModuleV1 from '@components/v1/users/users.module';
import { appRoutes } from '@components/app/app.routes';

import { MongooseModule } from '@nestjs/mongoose';
import AppController from './app.controller';
import AppService from './app.service';
import RoutesValidationUtils from '../../utils/routes-validation.utils';

RoutesValidationUtils.validate(appRoutes);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL as string, {
      // automatically try to reconnect when it loses connection
      autoReconnect: true,
      useCreateIndex: true,
      // reconnect every reconnectInterval milliseconds
      // for reconnectTries times
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      // flag to allow users to fall back to the old
      // parser if they find a bug in the new parse
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        port: Number(process.env.MAILER_PORT),
        secure: false,
        auth: {
          user: process.env.MAILER_USERNAME,
          pass: process.env.MAILER_PASSWORD,
        },
      },
      defaults: {
        from: process.env.MAILER_FROM_EMAIL,
      },
      template: {
        dir: `${process.cwd()}/public/views/mailer/templates/`,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    RouterModule.forRoutes(appRoutes),
    HomeModuleV1,
    AuthModuleV1,
    UsersModuleV1,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
