import * as bcrypt from 'bcrypt';

import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import SignUpDto from '@v1/auth/dto/sign-up.dto';

import { User } from '@v1/users/schemas/users.schema';
import UsersRepository from './users.repository';
import UpdateUserDto from './dto/update-user.dto';
import UserEntity from '@v1/users/entity/user.entity';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(user: SignUpDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.usersRepository.create({
      password: hashedPassword,
      email: user.email,
    });
  }

  public getByEmail(
    email: string,
    verified = true,
  ): Promise<User | null> {
    return this.usersRepository.getByEmail(email, verified);
  }

  public getById(id: Types.ObjectId, verified = true): Promise<User | null> {
    return this.usersRepository.getById(id, verified);
  }

  public update(
    id: Types.ObjectId,
    data: UpdateUserDto,
  ): Promise<User | null> {
    return this.usersRepository.updateById(id, data);
  }

  getAll(verified: boolean = true) {
    return this.usersRepository.getAll(verified);
  }
}
