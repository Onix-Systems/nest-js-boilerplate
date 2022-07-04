import { Injectable } from '@nestjs/common';
import { RolesEnum } from '@decorators/roles.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import RoleEntity from '@v1/roles/schemas/role.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export default class RolesRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesModel: Repository<RoleEntity>,
  ) {}

  getByName(name: RolesEnum) {
    return this.rolesModel.findOne({
      where: {
        name,
      },
    });
  }
}
