import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import UsersRepository from '@v1/users/users.repository';
import CaslAbilityFactory from 'src/casl-ability/casl-ability.factory';
import { User, UserSchema } from './schemas/users.schema';

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
  providers: [UsersService, UsersRepository, CaslAbilityFactory],
  exports: [UsersService],
})
export default class UsersModule {}
