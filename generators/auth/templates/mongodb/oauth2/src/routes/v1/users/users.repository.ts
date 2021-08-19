import { Model, Query, FilterQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from '@v1/users/schemas/users.schema';
import UserEntity from './entities/user.entity';

@Injectable()
export default class UsersRepository {
  constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>) {}

  public async create(user: User): Promise<User> {
    const newUser = await this.usersModel.create(user);

    return newUser.toJSON();
  }

  public async findOne(filter: FilterQuery<UserEntity>) {
    const user = await this.usersModel.findOne(filter, { password: 0 }).exec();

    return user ? user.toJSON() : null;
  }

  public getAll(verified: boolean = true): Query<UserDocument[], UserDocument> {
    return this.usersModel.find({ verified }).lean();
  }

  public getVerifiedUsers(): Query<UserDocument[], UserDocument> {
    return this.usersModel.find({ verified: true }).lean();
  }
}
