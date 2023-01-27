import { Injectable } from '@nestjs/common';

import { RolesEnum } from '@decorators/roles.decorator';
import { User } from '@prisma/client';

import PrismaService from 'prisma/prisma.service';
import UserDto from './dto/user.dto';
import { IUpdateUser } from './interfaces/update-user-fields';

@Injectable()
export default class UsersRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  public create(user: UserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...user,
      },
    });
  }

  public async getVerifiedUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
        verified: true,
      },
    });
  }

  public async getVerifiedUserById(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id,
        verified: true,
      },
    });
  }

  public async getAll(): Promise<User[] | []> {
    return this.prisma.user.findMany();
  }

  public findOneAndUpdate(id: string, fieldForUpdate: IUpdateUser) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...fieldForUpdate,
      },
    });
  }

  public async getVerifiedAdminByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
        roles: { has: RolesEnum.ADMIN },
        verified: true,
      },
    });
  }
}
