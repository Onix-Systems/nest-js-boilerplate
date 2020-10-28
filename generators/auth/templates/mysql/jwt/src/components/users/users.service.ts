import * as bcrypt from 'bcrypt';

import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import SignUpDto from '@components/auth/dto/sign-up.dto';
import UserEntity from './entities/user.entity';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(user: SignUpDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.usersRepository.save({
      password: hashedPassword,
      email: user.email,
      verified: false,
    });
  }

  async getByEmail(email: string, verified = true): Promise<UserEntity | null> {
    const foundUser: UserEntity | undefined = await this.usersRepository.findOne({
      where: [{
        email,
        verified,
      }],
    });

    return foundUser || null;
  }

  async getById(id: number, verified: boolean = true): Promise<UserEntity | null> {
    const foundUser: UserEntity | undefined = await this.usersRepository.findOne(id, {
      where: [{ verified }],
    });

    return foundUser || null;
  }

  update(id: number, data: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update(id, data);
  }

  getAll(verified : boolean = true): Promise<UserEntity[] | []> {
    return this.usersRepository.find({
      where: {
        verified,
      },
    });
  }
}
