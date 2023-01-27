import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';
import UsersRepository from './users.repository';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public create(user: User): Promise<User> {
    return this.usersRepository.create({
      ...user,
      verified: true,
    });
  }

  public getByEmail(email: string) {
    return this.usersRepository.getByEmail(email);
  }

  public async getVerifiedUserByEmail(email: string) {
    return this.usersRepository.getVerifiedUserByEmail(email);
  }

  public getById(id: string): Promise<User | null> {
    return this.usersRepository.getById(id);
  }

  public getVerifiedUserById(id: string): Promise<User | null> {
    return this.usersRepository.getVerifiedUserById(id);
  }

  public async createIfDoesNotExist(user: User): Promise<User | null> {
    const foundUser = await this.usersRepository.getUnverifiedUserByEmail(user.email);

    if (!foundUser) {
      return this.usersRepository.create({
        ...user,
        verified: true,
      });
    }

    return foundUser;
  }

  getAllVerified(): Promise<User[]> {
    return this.usersRepository.getVerifiedUsers();
  }
}
