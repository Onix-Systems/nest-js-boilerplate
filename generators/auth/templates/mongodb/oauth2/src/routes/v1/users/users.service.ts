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

  public getByEmail(email: string, verified = true) {
    return this.usersRepository.findOne({
      email,
      verified,
    });
  }

  public getById(id: Types.ObjectId, verified = true): Promise<User | null> {
    return this.usersRepository.findOne({
      _id: id,
      verified,
    });
  }

  public async createIfDoesNotExist(user: UserDto): Promise<User | null> {
    const foundUser = await this.usersRepository.findOne({
      email: user.email,
    });

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
