import * as bcrypt from 'bcrypt';

import { ObjectID } from 'mongodb';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import usersConstants from '@components/users/users-constants';
import UserDto from './dto/user.dto';
import UserEntity from './entities/user.entity';

@Injectable()
export default class UsersService {
  constructor(
      @InjectModel(usersConstants.models.users)
      private readonly usersRepository: Model<UserEntity>,
  ) {}

  async create(userDto: UserDto): Promise<UserEntity> {
    const hashedPassword: string = await bcrypt.hash(userDto.password, 10);

    return this.usersRepository.create({
      password: hashedPassword,
      email: userDto.email,
      verified: true,
    });
  }

  getVerifiedByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({
      email,
      verified: true,
    }).exec();
  }

  getById(id: ObjectID, verified = true): Promise<UserEntity | null> {
    return this.usersRepository.findOne({
      _id: id,
      verified,
    }).exec();
  }

  getAll(): Promise<UserEntity[] | []> {
    return this.usersRepository.find().exec();
  }
}
