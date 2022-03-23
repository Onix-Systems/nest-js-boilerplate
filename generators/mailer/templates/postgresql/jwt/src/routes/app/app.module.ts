import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import V1Module from '@v1/v1.module';

import AppService from './app.service';
import AppController from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get('POSTGRESQL_HOST') || 'postgres',
        port: (cfg.get('POSTGRESQL_PORT') as unknown) as number,
        database: cfg.get('POSTGRESQL_DB'),
        username: cfg.get('POSTGRESQL_ROOT_USER'),
        password: cfg.get('POSTGRESQL_PASSWORD'),
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
  providers: [AppService],
})
export default class AppModule {}
