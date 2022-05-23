import { Injectable } from '@nestjs/common';

import UserEntity from './schemas/user.entity';
import UserDto from './dto/user.dto';
import UsersRepository from './users.repository';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public create(user: UserDto): Promise<UserEntity> {
    return this.usersRepository.create(user);
  }

  public getAll(): Promise<UserEntity[] | []> {
    return this.usersRepository.find();
  }

  public async getByEmail(email: string): Promise<UserEntity | undefined> {
    return this.usersRepository.getByEmail(email);
  }

  public async getVerifiedUserByEmail(email: string) : Promise<UserEntity | undefined> {
    return this.usersRepository.getVerifiedUserByEmail(email);
  }

  public async getById(id: number): Promise<UserEntity | undefined> {
    return this.usersRepository.getById(id);
  }

  public async getVerifiedUserById(id: number): Promise<UserEntity | undefined> {
    return this.usersRepository.getVerifiedUserById(id);
  }
}
