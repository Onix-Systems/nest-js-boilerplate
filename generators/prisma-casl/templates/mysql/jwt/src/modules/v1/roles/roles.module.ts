import { Module } from '@nestjs/common';
import RolesService from '@v1/roles/roles.service';
import RolesRepository from '@v1/roles/roles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResponseEntity } from '@v1/users/entities/user-response.entity';
import PrismaService from 'prisma/prisma.service';
// import RoleEntity from '@v1/roles/schemas/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserResponseEntity])],
  providers: [RolesService, RolesRepository, PrismaService],
  exports: [RolesService, RolesRepository],
})
export default class RolesModule {}
