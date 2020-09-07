import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';

import AuthModule from '@components/auth/auth.module';
import UsersModule from '@components/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://root:1234@cluster0-ilpdw.mongodb.net/nestjs-test-api',
      // automatically try to reconnect when it loses connection
      autoReconnect: true,
      // reconnect every reconnectInterval milliseconds
      // for reconnectTries times
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      // flag to allow users to fall back to the old
      // parser if they find a bug in the new parse
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RedisModule.register({
      url: 'redis://127.0.0.1:6379',
      onClientReady: async (client): Promise<void> => {
        client.on('error', console.error);
        client.on('ready', () => console.log('redis is running on 6379 port'));
        client.on('restart', () => console.log('attempt to restart the redis server'));
      },
      reconnectOnError: (): boolean => true,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
