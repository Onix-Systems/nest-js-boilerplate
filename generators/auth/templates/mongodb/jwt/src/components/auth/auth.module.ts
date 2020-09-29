import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import UsersModule from '@components/users/users.module';
import LocalStrategy from './strategies/local.strategy';
import JwtStrategy from './strategies/jwt.strategy';
import jwtConstants from './constants';

import AuthController from './auth.controller';
import AuthService from './auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export default class AuthModule {}
