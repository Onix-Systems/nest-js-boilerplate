import { Types, Model, Query } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from '@v1/users/schemas/users.schema';
import UserEntity from './entities/user.entity';
import UserDto from './dto/user.dto';

@Injectable()
export default class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>) {}

  create(user: UserDto): Promise<UserDocument> {
    return this.usersModel.create({
      ...user,
      verified: true,
    });
  }

  async getByEmail(email: string, verified = true): Promise<UserEntity | null> {
    const foundUser = await this.usersModel.findOne({
      email,
      verified,
    }).exec() as UserEntity;

    return foundUser || null;
  }

  async getById(id: Types.ObjectId, verified = true): Promise<User | null> {
    const foundUser = await this.usersModel.findOne({
      _id: id,
      verified,
    }).exec() as UserEntity;

    return foundUser.toJSON() || null;
  }

  async createIfDoesNotExist(user: UserDto): Promise<User | null> {
    const foundUser = await this.usersModel.findOne({
      email: user.email,
    });
    let createdUser = foundUser;

    if (!foundUser) {
      createdUser = await this.usersModel.create({ ...user, verified: true });
    }

    return createdUser;
  }

  getAllVerified(verified: boolean = true): Query<UserDocument[], UserDocument> {
    return this.usersModel.find({
      verified,
    }).lean();
  }
}
