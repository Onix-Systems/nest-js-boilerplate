import { Injectable } from '@nestjs/common';
import { RolesEnum } from '@decorators/roles.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { UserResponseEntity } from '@v1/users/entities/user-response.entity';
import { RoleEntity } from '@prisma/client';
import PrismaService from 'prisma/prisma.service';

@Injectable()
export default class RolesRepository {
  constructor(
    @InjectRepository(UserResponseEntity)
    private readonly rolesModel: Repository<RoleEntity>,
    private readonly prisma: PrismaService,
  ) {}

  async getByName(name: RolesEnum) {
    return this.prisma.roleEntity.findFirst({
      where: {
        name,
      },
    });
  }
}
