import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import UsersRepository from '@v1/users/users.repository';
import PrismaService from 'prisma/prisma.service';

import UsersController from './users.controller';
import UsersService from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService],
  exports: [UsersService],
})
export default class UsersModule {}
