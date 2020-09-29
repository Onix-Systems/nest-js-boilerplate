import * as bcrypt from 'bcrypt';

import { Model } from 'mongoose';
import { ObjectID } from 'mongodb';
import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import UserEntity from './entities/user.entity';

import UpdateUserDto from './dto/updateUser.dto';
import CreateUserDto from './dto/createUser.dto';
import usersConstants from './constants';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel(
      usersConstants.models.users,
    ) private usersRepository: Model<UserEntity>,
  ) {}

  async create(user: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.usersRepository.create({
      password: hashedPassword,
      email: user.email,
      verified: false,
    });
  }

  getByEmail(email: string, verified = true): Promise<UserEntity> {
    return this.usersRepository.findOne({
      email,
      verified,
    }).exec();
  }

  getById(id: ObjectID, verified = true): Promise<UserEntity> {
    return this.usersRepository.findOne({
      verified,
      _id: new ObjectID(id),
    }).exec();
  }

  update(id: ObjectID, data: UpdateUserDto): Promise<UserEntity> {
    return this.usersRepository.updateOne(
      {
        _id: id,
      },
      {
        $set: data,
      },
    ).exec();
  }

  getAll(verified : boolean = true): Promise<UserEntity[] | []> {
    return this.usersRepository.find({
      verified,
    }).exec();
  }
}
