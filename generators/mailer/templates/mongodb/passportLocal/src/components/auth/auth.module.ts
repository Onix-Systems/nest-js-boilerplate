import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import UsersModule from '@components/users/users.module';
import LocalStrategy from './strategies/local.strategy';

import AuthController from './auth.controller';
import AuthService from './auth.service';
import LocalAuthGuard from './guards/local-auth.guard';
import LocalSerializer from './serializers/local.serializer';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'local',
      session: true,
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    LocalSerializer,
    LocalAuthGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export default class AuthModule {}
