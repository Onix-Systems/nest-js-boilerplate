import * as bcrypt from 'bcrypt';

import { MongoRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import UserEntity from './entities/user.entity';
import UserDto from './dto/user.dto';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: MongoRepository<UserEntity>,
  ) {}

  async create(userDto: UserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    return this.usersRepository.save({
      password: hashedPassword,
      email: userDto.email,
      verified: true,
    });
  }

  getVerifiedByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      email,
      verified: true,
    });
  }

  getById(id: number, verified = true): Promise<UserEntity> {
    return this.usersRepository.findOne({
      id,
      verified,
    });
  }

  getAll(): Promise<UserEntity[] | []> {
    return this.usersRepository.find();
  }
}
