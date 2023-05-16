import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import V1Module from '../v1/v1.module';

import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        type: 'mysql',
        host: cfg.get('MYSQL_HOST') || 'mysql',
        port: (cfg.get('MYSQL_PORT') as unknown) as number,
        database: cfg.get('MYSQL_DB'),
        username: cfg.get('MYSQL_ROOT_USER'),
        password: cfg.get('MYSQL_PASSWORD'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/**/migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migrations',
        },
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule { }
