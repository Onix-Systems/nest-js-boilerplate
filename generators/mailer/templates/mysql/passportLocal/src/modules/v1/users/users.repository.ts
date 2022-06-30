import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from '@v1/users/entities/user.entity';
import UserDto from '@v1/users/dto/user.dto';
import { IUpdateUser } from './interfaces/update-user-fields';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersModel: Repository<UserEntity>,
  ) {}

  public create(user: UserDto): Promise<UserEntity> {
    return this.usersModel.save({
      ...user,
      verified: false,
    });
  }

  public async getByEmail(email: string): Promise<UserEntity | void> {
    return this.usersModel.findOne({
      email,
    });
  }

  public async getById(id: number): Promise<UserEntity | void> {
    return this.usersModel.findOne({
      id,
    });
  }

  public async getVerifiedUserByEmail(email: string): Promise<UserEntity | void> {
    return this.usersModel.findOne({
      email,
      verified: true,
    });
  }

  public async getAll(): Promise<UserEntity[] | []> {
   const users: UserEntity[] | [] = await this.usersModel.find( { select: ['id', 'email', 'role', 'verified'] });

    return users.length > 0 ? users : [];
  }

  public findOneAndUpdate(id: number, fieldForUpdate: IUpdateUser) {
    return this.usersModel.update({ id }, fieldForUpdate);
  }
}
