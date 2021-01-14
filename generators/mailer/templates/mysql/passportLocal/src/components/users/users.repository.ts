import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from '@components/users/entities/user.entity';
import UserDto from '@components/users/dto/user.dto';
import { IUpdateUser } from './interfaces/update-user-fields';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userModel: Repository<UserEntity>,
  ) {}

  public create(user: UserDto): Promise<UserEntity> {
    return this.userModel.save({
      ...user,
      verified: false,
    });
  }

  public async getByEmail(email: string): Promise<UserEntity | null> {
    const user: UserEntity | undefined = await this.userModel.findOne({
      email,
    });

    return user || null;
  }

  public async getById(id: number): Promise<UserEntity | null> {
    const user: UserEntity | undefined = await this.userModel.findOne({
      id,
    });

    return user || null;
  }

  public async getAllVerified(): Promise<UserEntity[] | []> {
    const users: UserEntity[] | [] = await this.userModel.find({
      verified: true,
    });

    return users.length > 0 ? users : [];
  }

  public findOneAndUpdate(id: number, fieldForUpdate: IUpdateUser) {
    return this.userModel.update({ id }, fieldForUpdate);
  }
}
