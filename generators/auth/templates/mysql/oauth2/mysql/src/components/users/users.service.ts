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

  getByEmail(email: string, verified = true): Promise<UserEntity> {
    return this.usersRepository.findOne({
      email,
      verified,
    });
  }

  getById(id: number, verified = true): Promise<UserEntity> {
    return this.usersRepository.findOne({
      id,
      verified,
    });
  }
}
