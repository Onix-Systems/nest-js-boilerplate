import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import AuthModule from '@components/auth/auth.module';
import UsersModule from '@components/users/users.module';

import AppService from './app.service';
import AppController from './app.controller';
import AppGateway from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: (process.env.MYSQL_PORT as unknown) as number,
      database: process.env.MYSQL_DB,
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_PASSWORD,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RedisModule.register({
      url: process.env.REDIS_URL,
      onClientReady: async (client): Promise<void> => {
        client.on('error', console.error);
        client.on('ready', () => {
          console.log('redis is running on 6379 port');
        });
        client.on('restart', () => {
          console.log('attempt to restart the redis server');
        });
      },
      reconnectOnError: (): boolean => true,
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
        dir: `${process.cwd()}/src/templates/`,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export default class AppModule {}
