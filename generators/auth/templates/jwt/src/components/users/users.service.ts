import * as bcrypt from 'bcrypt';

import { ObjectID } from 'mongodb';
import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import UserEntity from './entities/user.entity';
import UpdateUserDto from './dto/updateUser.dto';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.usersRepository.save({
      password: hashedPassword,
      email: user.email,
      verified: false,
    });
  }

  getByEmail(email: string, verified = true): Promise<UserEntity> {
    return this.usersRepository.findOne({
      email,
      verified,
    });
  }

  getById(id: ObjectID, verified = true): Promise<UserEntity> {
    return this.usersRepository.findOne({
      verified,
      _id: new ObjectID(id),
    });
  }

  update(id: ObjectID, data: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update(id, data);
  }

  getAll(verified : boolean = true): Promise<UserEntity[] | []> {
    return this.usersRepository.find({
      where: {
        verified,
      },
    });
  }
}
