import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import V1Module from '@v1/v1.module';

import AppService from './app.service';
import AppController from './app.controller';
import AppGateway from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        type: 'mysql',
        host: cfg.get('MYSQL_HOST'),
        port: (cfg.get('MYSQL_PORT') as unknown) as number,
        database: cfg.get('MYSQL_DB'),
        username: cfg.get('MYSQL_ROOT_USER'),
        password: cfg.get('MYSQL_PASSWORD'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        config: {
          url: cfg.get('REDIS_URL'),
        },
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        transport: {
          host: cfg.get('MAILER_HOST'),
          port: Number(cfg.get('MAILER_PORT')),
          secure: false,
          auth: {
            user: cfg.get('MAILER_USERNAME'),
            pass: cfg.get('MAILER_PASSWORD'),
          },
        },
        defaults: {
          from: cfg.get('MAILER_FROM_EMAIL'),
        },
        template: {
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export default class AppModule {}
