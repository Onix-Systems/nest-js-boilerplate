import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import V1Module from '../v1/v1.module';

import AppController from './app.controller';
import AppService from './app.service';
import AppGateway from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL as string, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          url: process.env.REDIS_URL,
          onClientCreated: async (client): Promise<void> => {
            client.on('error', console.error);
            client.on('ready', () => {
              console.log('redis is running on 6379 port');
            });
            client.on('restart', () => {
              console.log('attempt to restart the redis server');
            });
          },
          reconnectOnError: (): boolean => true,
        },
      }),
    }),
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export default class AppModule { }
