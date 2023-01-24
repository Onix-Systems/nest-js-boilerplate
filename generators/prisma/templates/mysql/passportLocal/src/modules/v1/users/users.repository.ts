import { Injectable } from '@nestjs/common';
import { UserEntity } from '@prisma/client';

import { ICreateUser } from '@v1/users/interfaces/user.interface';

import PrismaService from 'prisma/prisma.service';
import { FoundUsers } from './interfaces/found-users.interface';

@Injectable()
export default class UsersRepository {
  constructor(
       private readonly prisma: PrismaService,
  ) {}

  public async create(user: ICreateUser): Promise<UserEntity> {
    return this.prisma.userEntity.create({
      data: {
        email: user.email,
        password: user.password,
        verified: false,
        roles: {
          create: [
            {
              RoleEntity: {
                connect: {
                  id: user.roles[0].id,
                },
              },
            },
          ],
        },
      },
    });
  }

  public async getUnverifiedUserByEmail(email: string): Promise<UserEntity | null> {
    return this.prisma.userEntity.findFirst({
      where: {
        email,
        verified: false,
      },
    });
  }

  public async getVerifiedUserByEmail(email: string): Promise<FoundUsers | null> {
    const result = await this.prisma.userEntity.findFirst({
      where: {
        email,
        verified: true,
      },
      include: {
        roles: {
          select: {
            RoleEntity: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return { ...result, roles: result?.roles.map((el) => el.RoleEntity.name) };
  }

  public async getVerifiedUserById(id: number): Promise<FoundUsers> {
    const result = await this.prisma.userEntity.findFirst({
      where: { verified: true, id },
      include: {
        roles: {
          select: {
            RoleEntity: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return { ...result, roles: result?.roles.map((elem) => elem.RoleEntity.name) };
  }

  public async getUnverifiedUserById(id: number): Promise<UserEntity | null> {
    return this.prisma.userEntity.findFirst({
      where: { verified: false, id },
    });
  }

  public async getAll(): Promise<FoundUsers[] | []> {
    const findVerifiedUsers = await this.prisma.userEntity.findMany({
      where: {
        verified: true,
      },
      include: {
        roles: {
          select: {
            RoleEntity: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const result = findVerifiedUsers.map((elem) => {
      return {
        ...elem,
        roles: elem.roles.map((item) => item.RoleEntity.name),
      };
    });

    return result;
  }
}
