import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import LocalStrategy from '@components/auth/strategies/local.strategy';

import UsersModule from '@components/users/users.module';
import AuthController from '@components/auth/auth.controller';
import AuthService from '@components/auth/auth.service';
import LocalAuthGuard from '@components/auth/guards/local-auth.guard';
import LocalSerializer from '@components/auth/serializers/local.serializer';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'local',
      session: true,
    }),
  ],
  providers: [AuthService, LocalStrategy, LocalSerializer, LocalAuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export default class AuthModule {}
