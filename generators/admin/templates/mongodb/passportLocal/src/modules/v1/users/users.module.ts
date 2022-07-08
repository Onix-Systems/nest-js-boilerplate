import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User } from '@v1/users/schemas/users.schema';

import UsersRepository from './users.repository';
import { UserSchema } from './schemas/users.schema';

import UsersController from './users.controller';
import UsersService from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema,
    }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository, MongooseModule],
})
export default class UsersModule {}
