import * as bcrypt from 'bcrypt';

import { Model } from 'mongoose';
import { ObjectID } from 'mongodb';
import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import SignUpDto from '@components/auth/dto/sign-up.dto';
import UserEntity from './entities/user.entity';

import UpdateUserDto from './dto/update-user.dto';
import usersConstants from './users-constants';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel(
      usersConstants.models.users,
    ) private usersRepository: Model<UserEntity>,
  ) {}

  async create(user: SignUpDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.usersRepository.create({
      password: hashedPassword,
      email: user.email,
    });
  }

  async getByEmail(email: string, verified = true): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      email,
      verified,
    }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  getById(id: ObjectID, verified = true): Promise<UserEntity | null> {
    return this.usersRepository.findOne({
      verified,
      _id: id,
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
