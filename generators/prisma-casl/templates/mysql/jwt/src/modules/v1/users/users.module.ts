import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import RolesModule from '@v1/roles/roles.module';

import CaslAbilityFactory from 'src/casl-ability/casl-ability.factory';
import UsersController from './users.controller';
import UsersService from './users.service';
import UsersRepository from './users.repository';
import { UserResponseEntity } from './entities/user-response.entity';
import PrismaService from 'prisma/prisma.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserResponseEntity]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, CaslAbilityFactory, PrismaService],
  exports: [UsersService, UsersRepository],
})
export default class UsersModule {}
