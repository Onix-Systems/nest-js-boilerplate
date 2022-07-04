import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
        migrations: ['dist/**/migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migrations',
        },
        migrationsRun: true,
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
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule { }
