import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { FindConditions } from 'typeorm/find-options/FindConditions';

import UserEntity from './schemas/user.entity';
import UserDto from './dto/user.dto';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersModel: Repository<UserEntity>,
  ) {}

  public create(user: UserDto): Promise<UserEntity> {
    return this.usersModel.save({
      ...user,
      verified: true,
    });
  }

  public async getByEmail(email: string): Promise<UserEntity | void> {
    return this.usersModel.findOne({
      where: [{
        email
      }],
    });
  }

  public async getVerifiedUserByEmail(email: string): Promise<UserEntity | void> {
    return this.usersModel.findOne({
      email,
      verified: true,
    });
  }

  public async getUnverifiedUserByEmail(email: string): Promise<UserEntity | void> {
    return this.usersModel.findOne({
      email,
      verified: false,
    });
  }

  public async getById(id: number): Promise<UserEntity | void> {
    return this.usersModel.findOne(id);
  }

  public async getVerifiedUserById(id: number): Promise<UserEntity | void> {
    return this.usersModel.findOne(id, {
      where: [{ verified: true }],
    });
  }

  public find(): Promise<UserEntity[] | []> {
    return this.usersModel.find();
  }

  public findOne(filter: FindConditions<UserEntity>) {
    return this.usersModel.findOne(filter);
  }
}
