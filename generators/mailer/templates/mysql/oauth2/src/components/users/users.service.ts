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

  create(user: UserDto): Promise<UserEntity> {
    return this.usersRepository.save({
      ...user,
      verified: true,
    });
  }

  async getByEmail(email: string, verified = true): Promise<UserEntity | null> {
    const foundUser = await this.usersRepository.findOne({
      email,
      verified,
    });

    return foundUser || null;
  }

  async getById(id: number, verified = true): Promise<UserEntity | null> {
    const foundUser = await this.usersRepository.findOne({
      id,
      verified,
    });

    return foundUser || null;
  }
}
