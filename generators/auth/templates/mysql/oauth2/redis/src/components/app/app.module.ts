import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import AuthModule from '@components/auth/auth.module';
import UsersModule from '@components/users/users.module';

import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.MYSQL_URL,
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_PASSWORD,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
