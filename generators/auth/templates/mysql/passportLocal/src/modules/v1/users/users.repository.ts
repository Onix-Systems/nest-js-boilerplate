import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/index';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from './entities/user.entity';
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

  public async getVerifiedUserById(id: number): Promise<UserEntity | void> {
    return this.usersModel.findOne({
      id,
      verified: true,
    });
  }

  public async getUnverifiedUserById(id: number): Promise<UserEntity | void> {
    return this.usersModel.findOne({
      id,
      verified: false,
    });
  }

  public async getAll(): Promise<UserEntity[] | []> {
    return this.usersModel.find( { select: ['id', 'email', 'role', 'verified'] });
  }
}
