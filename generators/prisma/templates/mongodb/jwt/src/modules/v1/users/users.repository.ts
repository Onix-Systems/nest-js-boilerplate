import { Injectable } from '@nestjs/common';

import { RolesEnum } from '@decorators/roles.decorator';

import SignUpDto from '@v1/auth/dto/sign-up.dto';
import { User } from '@prisma/client';

import PrismaService from 'prisma/prisma.service';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export default class UsersRepository {
  constructor(private prisma: PrismaService) {}

  public async create(user: SignUpDto): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        verified: false,
      },
    });

    return newUser;
  }

  public async getUnverifiedUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
        verified: false,
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

  public async getById(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id,
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

  public async getUnverifiedUserById(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id,
        verified: false,
      },
    });
  }

  public async updateById(id: string, data: UpdateUserDto): Promise<User | null> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  public getAll() {
    return this.prisma.user.findMany();
  }

  public getVerifiedUsers() {
    return this.prisma.user.findMany({
      where: {
        verified: true,
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
