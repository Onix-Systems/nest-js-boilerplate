import { Module } from '@nestjs/common';

import PrismaService from 'prisma/prisma.service';
import CaslAbilityFactory from 'src/casl-ability/casl-ability.factory';
import UsersController from './users.controller';
import UsersService from './users.service';
import UsersRepository from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService, CaslAbilityFactory],
  exports: [UsersService, UsersRepository],
})
export default class UsersModule {}
