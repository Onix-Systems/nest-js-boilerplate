import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import AppController from './app.controller';
import AppService from './app.service';
import V1Module from '../v1/v1.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (cfg: ConfigService) => {
        return {
          uri: cfg.get('DATABASE_URL'),
        };
      },
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
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule { }
