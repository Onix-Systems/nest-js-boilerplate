import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { RolesEnum } from '@decorators/roles.decorator';

import SignUpDto from '@v1/auth/dto/sign-up.dto';
import { UserDocument, User } from '@v1/users/schemas/users.schema';

import UpdateUserDto from './dto/update-user.dto';

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

  public async getUnverifiedUserByEmail(email: string): Promise<User | null> {
    return this.usersModel.findOne({
      email,
      verified: false,
    }).exec();
  }

  public async getVerifiedUserByEmail(email: string): Promise<User | null> {
    return this.usersModel.findOne({
      email,
      verified: true,
    }).exec();
  }

  public async getById(id: Types.ObjectId): Promise<User | null> {
    return  this.usersModel.findOne({
      _id: id,
    }, { password: 0 }).exec();
  }

  public async getVerifiedUserById(id: Types.ObjectId): Promise<User | null> {
    return this.usersModel.findOne({
      _id: id,
      verified: true,
    }, { password: 0 }).exec();
  }

  public async getUnverifiedUserById(id: Types.ObjectId): Promise<User | null> {
    return this.usersModel.findOne({
      _id: id,
      verified: false,
    }, { password: 0 }).exec();
  }

  public async updateById(id: Types.ObjectId, data: UpdateUserDto): Promise<User | null> {
    return this.usersModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
    ).exec();
  }

  public getAll() {
    return this.usersModel.find().exec();
  }

  public getVerifiedUsers() {
    return this.usersModel.find({ verified: true }).exec();
  }

  public async getVerifiedAdminByEmail(email: string): Promise<User | null> {
    return this.usersModel.findOne({
      email,
      roles: { $in: RolesEnum.ADMIN },
      verified: true,
    }).exec();
  }
}
