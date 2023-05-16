import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import RolesModule from '@v1/roles/roles.module';

import UsersController from './users.controller';
import UsersService from './users.service';
import UsersRepository from '@v1/users/users.repository';
import { UserResponseEntity } from './entities/user-response.entity';
import PrismaService from 'prisma/prisma.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserResponseEntity]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService],
  exports: [UsersService],
})
export default class UsersModule {}
