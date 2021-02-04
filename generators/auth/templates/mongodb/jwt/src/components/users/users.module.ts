import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import authConstants from '@components/auth/auth-constants';

import { UserSchema } from './schemas/users.schema';
import usersConstants from './users-constants';
import UsersController from './users.controller';
import UsersService from './users.service';
import UsersRepository from './users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: usersConstants.models.users,
      schema: UserSchema,
    }]),
    JwtModule.register({
      secret: authConstants.jwt.secret,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export default class UsersModule {}
