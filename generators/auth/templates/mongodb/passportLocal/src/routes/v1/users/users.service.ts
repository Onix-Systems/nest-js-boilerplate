import * as bcrypt from 'bcrypt';

import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { User } from './schemas/users.schema';
import UsersRepository from './users.repository';
import UserDto from './dto/user.dto';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(userDto: UserDto): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(userDto.password, 10);

    return this.usersRepository.create({
      ...userDto,
      password: hashedPassword,
    });
  }

  getVerifiedByEmail(email: string): Promise<User | null> {
    return this.usersRepository.getVerifiedByEmail(email);
  }

  getVerifiedById(id: Types.ObjectId): Promise<User | null> {
    return this.usersRepository.getVerifiedById(id);
  }

  getAll(): Promise<User[] | []> {
    return this.usersRepository.getAll();
  }
}
