import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import UsersModule from '@components/users/users.module';
import MailerModule from '@components/mailer/mailer.module';
import LocalStrategy from './strategies/local.strategy';
import JwtAccessStrategy from './strategies/jwt-access.strategy';
import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';

import authConstants from './auth-constants';

import AuthController from './auth.controller';
import AuthService from './auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: authConstants.jwt.secret,
    }),
    MailerModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export default class AuthModule {}
