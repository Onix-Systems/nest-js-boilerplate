import { Module } from '@nestjs/common';
import RolesService from '@v1/roles/roles.service';
import RolesRepository from '@v1/roles/roles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import RoleEntity from '@v1/roles/schemas/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RolesService, RolesRepository],
  exports: [RolesService, RolesRepository],
})
export default class RolesModule {}
