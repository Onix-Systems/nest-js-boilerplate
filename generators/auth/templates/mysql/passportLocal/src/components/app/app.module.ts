import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from 'nest-router';

import HomeModuleV1 from '@components/v1/home/home.module';
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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT as unknown as number,
      database: process.env.MYSQL_DB,
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_PASSWORD,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
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
