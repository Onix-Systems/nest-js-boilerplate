import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import RolesModule from '@v1/roles/roles.module';

import UsersController from './users.controller';
import UsersService from './users.service';
import UserEntity from './schemas/user.entity';
import UsersRepository from './users.repository';
import CaslAbilityFactory from 'src/casl-ability/casl-ability.factory';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, CaslAbilityFactory],
  exports: [UsersService, UsersRepository],
})
export default class UsersModule {}
