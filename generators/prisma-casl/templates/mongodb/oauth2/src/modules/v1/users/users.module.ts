import { Module } from '@nestjs/common';

import UsersRepository from '@v1/users/users.repository';
import PrismaService from 'prisma/prisma.service';
import CaslAbilityFactory from 'src/casl-ability/casl-ability.factory';

import UsersController from './users.controller';
import UsersService from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService, CaslAbilityFactory],
  exports: [UsersService],
})
export default class UsersModule {}
