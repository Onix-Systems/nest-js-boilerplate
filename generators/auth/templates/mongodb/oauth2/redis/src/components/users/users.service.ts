import { ObjectID } from 'mongodb';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import usersConstants from '@components/users/users-constants';
import UserEntity from './entities/user.entity';
import UserDto from './dto/user.dto';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel(usersConstants.models.users)
    private readonly usersRepository: Model<UserEntity>,
  ) {}

  create(user: UserDto): Promise<UserEntity> {
    return this.usersRepository.create({
      ...user,
      verified: true,
    });
  }

  async getByEmail(email: string, verified = true): Promise<UserEntity | null> {
    const foundUser = await this.usersRepository.findOne({
      email,
      verified,
    }).exec();

    return foundUser || null;
  }

  async getById(id: ObjectID, verified = true): Promise<UserEntity | null> {
    const foundUser = await this.usersRepository.findOne({
      _id: id,
      verified,
    }).exec();

    return foundUser || null;
  }

  async createIfDoesNotExist(user: UserDto): Promise<UserEntity | null> {
    const foundUser = await this.usersRepository.findOne({
      email: user.email,
    });
    let createdUser = foundUser;

    if (!foundUser) {
      createdUser = await this.usersRepository.create(user);
    }

    return createdUser;
  }

  getAll(verified: boolean = true): Promise<UserEntity[] | []> {
    return this.usersRepository.find({
      verified,
    }).exec();
  }
}
