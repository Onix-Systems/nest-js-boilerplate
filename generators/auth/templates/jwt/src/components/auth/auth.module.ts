import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import LocalStrategy from '@components/auth/strategies/local.strategy';
import JwtStrategy from '@components/auth/strategies/jwt.strategy';
import jwtConstants from '@components/auth/constants';

import UsersModule from '@components/users/users.module';
import AuthController from '@components/auth/auth.controller';
import AuthService from '@components/auth/auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export default class AuthModule {}
