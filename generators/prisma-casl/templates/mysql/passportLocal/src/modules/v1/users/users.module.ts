import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import RolesModule from "@v1/roles/roles.module";

import UsersController from './users.controller';
import UsersService from './users.service';
import UsersRepository from './users.repository';
import { UserResponseEntity } from './entities/user-response.entity';
import PrismaService from 'prisma/prisma.service';
import CaslAbilityFactory from 'src/casl-ability/casl-ability.factory';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserResponseEntity]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService, CaslAbilityFactory, JwtService],
  exports: [UsersService, UsersRepository],
})
export default class UsersModule {}
