import { ObjectID } from 'mongodb';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import SignUpDto from '@components/auth/dto/sign-up.dto';
import { UserEntity } from './schemas/users.schema';

import UpdateUserDto from './dto/update-user.dto';

import usersConstants from './users-constants';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectModel(usersConstants.models.users) private usersModel: Model<UserEntity>,
  ) {}

  public create(user: SignUpDto): Promise<UserEntity> {
    return this.usersModel.create({
      ...user,
      verified: false,
    });
  }

  public getByEmail(email: string, verified: boolean = true): Promise<UserEntity | null> {
    return this.usersModel.findOne({
      email,
      verified,
    }).exec();
  }

  public getById(id: ObjectID, verified: boolean = true): Promise<UserEntity | null> {
    return this.usersModel.findOne({
      _id: id,
      verified,
    }).exec();
  }

  public updateById(id: ObjectID, data: UpdateUserDto): Promise<UserEntity> {
    return this.usersModel.updateOne(
      {
        _id: id,
      },
      {
        $set: data,
      },
    ).exec();
  }

  public getAll(verified: boolean): Promise<UserEntity[] | []> {
    return this.usersModel.find({
      verified,
    }).exec();
  }
}
