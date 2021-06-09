import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from 'nest-router';

import AuthModuleV1 from '@components/v1/auth/auth.module';
import UsersModuleV1 from '@components/v1/users/users.module';
import { appRoutes } from '@components/app/app.routes';

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
      // reconnect every reconnectInterval milliseconds
      // for reconnectTries times
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useCreateIndex: true,
      // flag to allow users to fall back to the old
      // parser if they find a bug in the new parse
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    RouterModule.forRoutes(appRoutes),
    AuthModuleV1,
    UsersModuleV1,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
