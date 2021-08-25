import { Query, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { User, UserDocument } from '@v1/users/schemas/users.schema';
import { RolesEnum } from '@decorators/roles.decorator';
import UserDto from './dto/user.dto';
import UsersRepository from './users.repository';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public create(user: UserDto): Promise<User> {
    return this.usersRepository.create({
      ...user,
      role: RolesEnum.user,
      verified: true,
    });
  }

  public getByEmail(email: string) {
    return this.usersRepository.getByEmail(email);
  }

  public async getVerifiedUserByEmail(email: string) {
    return this.usersRepository.getVerifiedUserByEmail(email);
  }

  public getById(id: Types.ObjectId): Promise<User | null> {
    return this.usersRepository.getById(id);
  }

  public getVerifiedUserById(id: Types.ObjectId): Promise<User | null> {
    return this.usersRepository.getVerifiedUserById(id);
  }

  public async createIfDoesNotExist(user: UserDto): Promise<User | null> {
    const foundUser = await this.usersRepository.getUnverifiedUserByEmail(user.email);

    if (!foundUser) {
      return this.usersRepository.create({
        ...user,
        role: RolesEnum.user,
        verified: true,
      });
    }

    return foundUser;
  }

  getAllVerified(): Query<UserDocument[], UserDocument> {
    return this.usersRepository.getVerifiedUsers();
  }
}
