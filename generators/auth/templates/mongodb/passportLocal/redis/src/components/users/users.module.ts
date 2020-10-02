import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import UserSchema from './schemas/users.schema';

import usersConstants from './users-constants';
import UsersController from './users.controller';
import UsersService from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: usersConstants.models.users,
      schema: UserSchema,
    }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export default class UsersModule {}
