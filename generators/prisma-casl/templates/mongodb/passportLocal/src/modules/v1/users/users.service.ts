import * as bcrypt from 'bcryptjs';

import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';
import UsersRepository from './users.repository';
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

  public getVerifiedUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.getVerifiedUserByEmail(email);
  }

  public getVerifiedUserById(id: string): Promise<User | null> {
    return this.usersRepository.getVerifiedUserById(id);
  }

  public async getAll(): Promise<User[] | []> {
    return this.usersRepository.getAll();
  }
}
