import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';
import PrismaService from 'prisma/prisma.service';

@Injectable()
export default class UsersRepository {
  constructor(private prisma: PrismaService) {}

  public async create(user: User): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        ...user,
      },
    });

    return newUser;
  }

  public async getByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
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

  public async getById(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  public async getVerifiedUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
        verified: true,
      },
    });
  }

  public async getUnverifiedUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
        verified: false,
      },
    });
  }

  public getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public getVerifiedUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        verified: true,
      },
    });
  }
}
