import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import UsersModule from '@v1/users/users.module';
import LocalStrategy from './strategies/local.strategy';

import AuthController from './auth.controller';
import AuthService from './auth.service';
import LocalAuthGuard from './guards/local-auth.guard';
import LocalSerializer from './serializers/local.serializer';
import CaslAbilityFactory from 'src/casl-ability/casl-ability.factory';

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
    CaslAbilityFactory,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export default class AuthModule {}
