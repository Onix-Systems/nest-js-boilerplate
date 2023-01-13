import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

import { ICreateUser } from '@v1/users/interfaces/user.interface';

import UserEntity from './schemas/user.entity';

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

  public async getByEmail(email: string): Promise<UserEntity | null> {
    return this.usersModel.findOne({
      where: [{
        email,
      }],
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

  public async getById(id: number): Promise<UserEntity | null> {
    return this.usersModel.findOne({ where: { id } });
  }

  public async getVerifiedUserById(id: number): Promise<UserEntity | null> {
    return this.usersModel.findOne({
      where: [{ verified: true, id }],
      relations: ['roles'],
    });
  }

  public find(): Promise<UserEntity[] | []> {
    return this.usersModel.find({
      relations: ['roles'],
    });
  }

  public findOne(filter: FindOneOptions<UserEntity>) {
    return this.usersModel.findOne(filter);
  }
}
