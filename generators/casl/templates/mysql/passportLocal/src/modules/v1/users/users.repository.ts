import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/index';
import { InjectRepository } from '@nestjs/typeorm';

import { ICreateUser } from '@v1/users/interfaces/user.interface';

import UserEntity from './entities/user.entity';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
       private readonly usersModel: Repository<UserEntity>,
  ) {}

  public create(user: ICreateUser): Promise<UserEntity> {
    return this.usersModel.save({
      ...user,
      verified: true,
    });
  }

  public async getVerifiedUserByEmail(email: string): Promise<UserEntity | null> {
    return this.usersModel.findOne({
      where: {
        email,
        verified: true,
      },
      relations: ['roles'],
    });
  }

  public async getUnverifiedUserByEmail(email: string): Promise<UserEntity | null> {
    return this.usersModel.findOne({
      where: {
        email,
        verified: false,
      },
    });
  }

  public async getVerifiedUserById(id: number): Promise<UserEntity | null> {
    return this.usersModel.findOne({
      where: {
        id,
        verified: true,
      },
    });
  }

  public async getUnverifiedUserById(id: number): Promise<UserEntity | null> {
    return this.usersModel.findOne({
      where: {
        id,
        verified: true,
      },
    });
  }

  public async getAll(): Promise<UserEntity[] | []> {
    return this.usersModel.find( { select: ['id', 'email', 'verified'], relations: ['roles'] });
  }
}
