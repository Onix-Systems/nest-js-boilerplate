import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

import SignUpDto from '@v1/auth/dto/sign-up.dto';
import UsersRepository from './users.repository';
import { UpdateResult } from 'typeorm/index';
import UserEntity from './schemas/user.entity';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {
  }

  public async create(user: SignUpDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });
  }

  public async getByEmail(email: string, verified = true): Promise<UserEntity | null> {
    return this.usersRepository.getByEmail(email, verified);
  }

  public async getById(id: number, verified: boolean = true): Promise<UserEntity | null> {
    return this.usersRepository.getById(id, verified);
  }

  public update(id: number, data: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.updateById(id, data);
  }

  public getAll(verified: boolean = true): Promise<UserEntity[] | []> {
    return this.usersRepository.getAll(verified);
  }

  public getVerifiedUsers(): Promise<UserEntity[] | []> {
    return this.usersRepository.getVerifiedUsers();
  }
}
