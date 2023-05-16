import { Injectable } from '@nestjs/common';
import { RolesEnum } from '@decorators/roles.decorator';
import { RoleEntity } from '@prisma/client';

import { Repository } from 'typeorm/index';

@Injectable()
export default class RolesRepository {
  constructor(
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
