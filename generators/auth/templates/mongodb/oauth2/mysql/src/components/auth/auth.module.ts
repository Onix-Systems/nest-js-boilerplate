import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import UsersModule from '@components/users/users.module';
import GoogleAuthGuard from './guards/google-auth.guard';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import GoogleStrategy from './strategies/google.strategy';
import GoogleDataSerializer from './serializers/google-data.serializer';

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
    GoogleStrategy,
    GoogleAuthGuard,
    GoogleDataSerializer,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export default class AuthModule {}
