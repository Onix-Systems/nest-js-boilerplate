import * as bcrypt from 'bcryptjs';

import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import SignUpDto from '@v1/auth/dto/sign-up.dto';

import { User } from '@v1/users/schemas/users.schema';
import UsersRepository from './users.repository';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  public async create(user: SignUpDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.usersRepository.create({
      password: hashedPassword,
      email: user.email,
    });
  }

  public getUnverifiedUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.getUnverifiedUserByEmail(email);
  }

  public getVerifiedUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.getVerifiedUserByEmail(email);
  }

  public getById(id: Types.ObjectId): Promise<User | null> {
    return this.usersRepository.getById(id);
  }

  public getVerifiedUserById(id: Types.ObjectId): Promise<User | null> {
    return this.usersRepository.getVerifiedUserById(id);
  }

  public getUnverifiedUserById(id: Types.ObjectId): Promise<User | null> {
    return this.usersRepository.getUnverifiedUserById(id);
  }

  public update(
    id: Types.ObjectId,
    data: UpdateUserDto,
  ): Promise<User | null> {
    return this.usersRepository.updateById(id, data);
  }

  public getVerifiedUsers() {
    return this.usersRepository.getVerifiedUsers();
  }
}
