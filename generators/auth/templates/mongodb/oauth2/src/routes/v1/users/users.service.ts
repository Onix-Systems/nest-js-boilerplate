import { Types, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from '@v1/users/schemas/users.schema';
import UserEntity from './entities/user.entity';
import UserDto from './dto/user.dto';

@Injectable()
export default class UsersService {
  constructor(@InjectModel(User.name) private usersRepository: Model<UserDocument>) {}

  create(user: UserDto): Promise<UserDocument> {
    return this.usersRepository.create({
      ...user,
      verified: true,
    });
  }

  async getByEmail(email: string, verified = true): Promise<UserEntity | null> {
    const foundUser = await this.usersRepository.findOne({
      email,
      verified,
    }).exec() as UserEntity;

    return foundUser || null;
  }

  async getById(id: Types.ObjectId, verified = true): Promise<UserEntity | null> {
    const foundUser = await this.usersRepository.findOne({
      _id: id,
      verified,
    }).exec() as UserEntity;

    return foundUser || null;
  }

  async createIfDoesNotExist(user: UserDto): Promise<User | null> {
    const foundUser = await this.usersRepository.findOne({
      email: user.email,
    });
    let createdUser = foundUser;

    if (!foundUser) {
      createdUser = await this.usersRepository.create(user);
    }

    return createdUser;
  }

  getAll(verified: boolean = true): Promise<UserDocument[]> {
    return this.usersRepository.find({
      verified,
    }).exec();
  }
}
