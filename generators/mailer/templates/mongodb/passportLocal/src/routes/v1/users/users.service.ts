import * as bcrypt from 'bcrypt';

import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { User } from '@v1/users/schemas/users.schema';
import UsersRepository from '@v1/users/users.repository';
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

  getByEmail(email: string): Promise<User | null> {
    return this.usersRepository.getByEmail(email);
  }

  getById(id: Types.ObjectId): Promise<User | null> {
    return this.usersRepository.getById(id);
  }

  getAll(): Promise<User[] | []> {
    return this.usersRepository.getAll();
  }

  verifyUser(_id: Types.ObjectId) {
    return this.usersRepository.findOneAndUpdate(_id, { verified: true });
  }
}
