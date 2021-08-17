import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import SignUpDto from '@v1/auth/dto/sign-up.dto';
import { UserDocument, User } from '@v1/users/schemas/users.schema';

import UpdateUserDto from './dto/update-user.dto';

import UsersEntity from '@v1/users/entity/user.entity';

@Injectable()
export default class UsersRepository {
  constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>) {}

  public async create(user: SignUpDto): Promise<User> {
    const newUser = await this.usersModel.create({
      ...user,
      verified: false,
    });

    return newUser.toJSON();
  }

  public async getByEmail(email: string, verified: boolean = true): Promise<User | null> {
    const user = await this.usersModel.findOne({
      email,
      verified,
    }).exec();

    return user ? user.toJSON() : null;
  }

  public async getById(id: Types.ObjectId, verified: boolean = true): Promise<User | null> {
    const user = await this.usersModel.findOne({
      _id: id,
      verified,
    }, { password: 0 }).exec();

    return user ? user.toJSON() : null;
  }

  public async updateById(id: Types.ObjectId, data: UpdateUserDto): Promise<User | null> {
    const updatedUser = await this.usersModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
    ).exec();

    return updatedUser ? updatedUser.toJSON() : null;
  }

  public getAllVerifiedUsers(verified: boolean = true) {
    return this.usersModel.find({ verified }).lean();
  }
}
