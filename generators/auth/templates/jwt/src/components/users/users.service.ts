import * as bcrypt from 'bcrypt';

import { ObjectID } from 'mongodb';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import UserEntity from './entities/user.entity';
import UserDto from './dto/user.dto';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(userDto: UserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    return this.usersRepository.save({
      password: hashedPassword,
      email: userDto.email,
      verified: false,
    });
  }

  getVerifiedByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      email,
      verified: true,
    });
  }

  getById(id: ObjectID, verified = true): Promise<UserEntity> {
    return this.usersRepository.findOne({
      verified,
      _id: new ObjectID(id),
    });
  }
}
