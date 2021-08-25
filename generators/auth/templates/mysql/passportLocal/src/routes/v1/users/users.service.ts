import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

import UserEntity from './entities/user.entity';
import UserDto from './dto/user.dto';
import UsersRepository from './users.repository';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(userDto: UserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    return this.usersRepository.create({
      password: hashedPassword,
      email: userDto.email,
    });
  }

  public getVerifiedUserByEmail(email: string): Promise<UserEntity | undefined> {
    return this.usersRepository.getVerifiedUserByEmail(email);
  }

  public getUnverifiedUserByEmail(email: string): Promise<UserEntity | undefined> {
    return this.usersRepository.getUnverifiedUserByEmail(email);
  }
  public getVerifiedUserById(id: number): Promise<UserEntity | undefined> {
    return this.usersRepository.getVerifiedUserById(id);
  }

  public getUnverifiedUserById(id: number): Promise<UserEntity | undefined> {
    return this.usersRepository.getUnverifiedUserById(id);
  }

  public getAll(): Promise<UserEntity[] | []> {
    return this.usersRepository.getAll();
  }
}
