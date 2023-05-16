import { Injectable } from '@nestjs/common';
import { RolesEnum } from '@decorators/roles.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '@prisma/client';
import { Repository } from 'typeorm/index';
import PrismaService from 'prisma/prisma.service';

@Injectable()
export default class RolesRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  getByName(name: RolesEnum) {
    return this.prisma.roleEntity.findFirst({
      where: {
        name,
      },
    });
  }
}
