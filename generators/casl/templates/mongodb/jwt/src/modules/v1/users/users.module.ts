import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema, User } from './schemas/users.schema';

import UsersController from './users.controller';
import UsersService from './users.service';
import UsersRepository from './users.repository';
import CaslAbilityFactory from 'src/casl-ability/casl-ability.factory';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema,
    }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, CaslAbilityFactory],
  exports: [UsersService, UsersRepository, MongooseModule],
})
export default class UsersModule {}
