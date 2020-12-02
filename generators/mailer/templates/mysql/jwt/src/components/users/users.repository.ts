import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm/index';
import SignUpDto from '@components/auth/dto/sign-up.dto';
import UpdateUserDto from '@components/users/dto/update-user.dto';
import UserEntity from './entities/user.entity';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersModel: Repository<UserEntity>,
  ) {}

  public create(user: SignUpDto): Promise<UserEntity> {
    return this.usersModel.save({
      ...user,
      verified: false,
    });
  }

  public async getByEmail(email: string, verified: boolean = true): Promise<UserEntity | null> {
    const user: UserEntity | undefined = await this.usersModel.findOne({
      where: [{
        email,
        verified,
      }],
    });

    return user || null;
  }

  public async getById(id: number, verified: boolean = true): Promise<UserEntity | null> {
    const foundUser: UserEntity | undefined = await this.usersModel.findOne(id, {
      where: [{ verified }],
    });

    return foundUser || null;
  }

  public updateById(id: number, data: UpdateUserDto): Promise<UpdateResult> {
    return this.usersModel.update(id, data);
  }

  public getAll(verified: boolean = true): Promise<UserEntity[] | []> {
    return this.usersModel.find({
      where: {
        verified,
      },
    });
  }
}
