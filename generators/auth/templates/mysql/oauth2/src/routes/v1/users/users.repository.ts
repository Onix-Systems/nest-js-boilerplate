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

  public async getByEmail(email: string): Promise<UserEntity | null> {
    const user: UserEntity | undefined = await this.usersModel.findOne({
      where: [{
        email
      }],
    });

    return user || null;
  }

  public async getVerifiedUserByEmail(email: string): Promise<UserEntity | null> {
    const user: UserEntity | undefined = await this.usersModel.findOne({
      email,
      verified: true,
    });

    return user || null;
  }

  public async getUnverifiedUserByEmail(email: string): Promise<UserEntity | null> {
    const user: UserEntity | undefined = await this.usersModel.findOne({
      email,
      verified: false,
    });

    return user || null;
  }

  public async getById(id: number): Promise<UserEntity | null> {
    const foundUser: UserEntity | undefined = await this.usersModel.findOne(id);

    return foundUser || null;
  }

  public async getVerifiedUserById(id: number): Promise<UserEntity | null> {
    const foundUser: UserEntity | undefined = await this.usersModel.findOne(id, {
      where: [{ verified: true }],
    });

    return foundUser || null;
  }

  public find(): Promise<UserEntity[] | []> {
    return this.usersModel.find();
  }

  public findOne(filter: FindConditions<UserEntity>) {
    return this.usersModel.findOne(filter);
  }
}
