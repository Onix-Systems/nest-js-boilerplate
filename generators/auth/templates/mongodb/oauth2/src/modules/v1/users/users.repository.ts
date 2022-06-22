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
    return this.usersModel.findOne({
      email,
    }, { password: 0 }).exec();
  }

  public async getVerifiedUserById(id: Types.ObjectId): Promise<User | null> {
    return this.usersModel.findOne({
      _id: id,
      verified: true,
    }, { password: 0 }).exec();
  }

  public async getById(id: Types.ObjectId): Promise<User | null> {
    return this.usersModel.findOne({
      _id: id,
    }, { password: 0 }).exec();
  }

  public async getVerifiedUserByEmail(email: string) {
    return this.usersModel.findOne({
      email,
      verified: true,
    }).exec();
  }

  public async getUnverifiedUserByEmail(email: string) {
    return this.usersModel.findOne({
      email,
      verified: false,
    }).exec();
  }

  public getAll(): Query<UserDocument[], UserDocument> {
    return this.usersModel.find().exec();
  }

  public getVerifiedUsers(): Query<UserDocument[], UserDocument> {
    return this.usersModel.find({ verified: true }).exec();
  }
}
