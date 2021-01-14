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

  public getByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.getByEmail(email);
  }

  public getById(id: number): Promise<UserEntity | null> {
    return this.usersRepository.getById(id);
  }

  public getAllVerified(): Promise<UserEntity[] | []> {
    return this.usersRepository.getAllVerified();
  }

  public verifyUser(id: number) {
    return this.usersRepository.findOneAndUpdate(id, { verified: true });
  }
}
