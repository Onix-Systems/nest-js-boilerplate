import * as bcrypt from 'bcrypt';

import { ObjectID } from 'mongodb';
import { Injectable } from '@nestjs/common';

import { UserEntity } from '@components/v1/users/schemas/users.schema';
import UsersRepository from '@components/v1/users/users.repository';
import UserDto from './dto/user.dto';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(userDto: UserDto): Promise<UserEntity> {
    const hashedPassword: string = await bcrypt.hash(userDto.password, 10);

    return this.usersRepository.create({
      ...userDto,
      password: hashedPassword,
    });
  }

  getByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.getByEmail(email);
  }

  getById(id: ObjectID): Promise<UserEntity | null> {
    return this.usersRepository.getById(id);
  }

  getAll(): Promise<UserEntity[] | []> {
    return this.usersRepository.getAll();
  }

  verifyUser(_id: ObjectID) {
    return this.usersRepository.findOneAndUpdate(_id, { verified: true });
  }
}
