import { Model, Query, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from '@v1/users/schemas/users.schema';

@Injectable()
export default class UsersRepository {
  constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>) {}

  public async create(user: User): Promise<User> {
    const newUser = await this.usersModel.create(user);

    return newUser.toJSON();
  }

  public async getByEmail(email: string): Promise<User | null> {
    const user = await this.usersModel.findOne({
      email,
    }, { password: 0 }).exec();

    return user ? user.toJSON() : null;
  }

  public async getVerifiedUserById(id: Types.ObjectId): Promise<User | null> {
    const user = await this.usersModel.findOne({
      _id: id,
      verified: true,
    }, { password: 0 }).exec();

    return user ? user.toJSON() : null;
  }

  public async getById(id: Types.ObjectId): Promise<User | null> {
    const user = await this.usersModel.findOne({
      _id: id,
    }, { password: 0 }).exec();

    return user ? user.toJSON() : null;
  }

  public async getVerifiedUserByEmail(email: string) {
    const user = await this.usersModel.findOne({
      email,
      verified: true,
    }).exec();

    return user ? user.toJSON() : null;
  }

  public async getUnverifiedUserByEmail(email: string) {
    const user = await this.usersModel.findOne({
      email,
      verified: false,
    }).exec();

    return user ? user.toJSON() : null;
  }

  public getAll(): Query<UserDocument[], UserDocument> {
    return this.usersModel.find().lean();
  }

  public getVerifiedUsers(): Query<UserDocument[], UserDocument> {
    return this.usersModel.find({ verified: true }).lean();
  }
}
