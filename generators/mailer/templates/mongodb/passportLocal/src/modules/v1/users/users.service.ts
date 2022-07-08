import * as bcrypt from 'bcryptjs';

import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { User } from '@v1/users/schemas/users.schema';
import UsersRepository from '@v1/users/users.repository';
import UserDto from './dto/user.dto';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(userDto: UserDto): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(userDto.password, 10);

    return this.usersRepository.create({
      ...userDto,
      password: hashedPassword,
    });
  }

  public async getAll(): Promise<User[] | []> {
    const users = await this.usersRepository.getAll();

    return users.map((user) => user.toJSON());
  }

  public getVerifiedUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.getVerifiedUserByEmail(email);
  }

  public getVerifiedUserById(id: Types.ObjectId): Promise<User | null> {
    return this.usersRepository.getVerifiedUserById(id);
  }

  public verifyUser(_id: Types.ObjectId) {
    return this.usersRepository.findOneAndUpdate(_id, { verified: true });
  }
}
