import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User } from './schemas/users.schema';

import UsersController from './users.controller';
import UsersService from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: User,
    }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export default class UsersModule {}
