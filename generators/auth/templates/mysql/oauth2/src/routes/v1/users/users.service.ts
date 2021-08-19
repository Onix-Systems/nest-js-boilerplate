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

  public async getByEmail(email: string, verified = true): Promise<UserEntity | null> {
    const foundUser = await this.usersRepository.findOne({
      email,
      verified,
    });

    return foundUser || null;
  }

  public async getById(id: number, verified = true): Promise<UserEntity | null> {
    const foundUser = await this.usersRepository.findOne({
      id,
      verified,
    });

    return foundUser || null;
  }
}
