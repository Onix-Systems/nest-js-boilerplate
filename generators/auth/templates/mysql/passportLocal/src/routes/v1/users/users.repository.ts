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

  public async getVerifiedByEmail(email: string): Promise<UserEntity | null> {
    const user: UserEntity | undefined = await this.usersModel.findOne({
      email,
      verified: true,
    });

    return user || null;
  }

  public async getVerifiedById(id: number): Promise<UserEntity | null> {
    const user: UserEntity | undefined = await this.usersModel.findOne({
      id,
      verified: true,
    });

    return user || null;
  }

  public async getAll(): Promise<UserEntity[] | []> {
    const users: UserEntity[] | [] = await this.usersModel.find( { select: ['id', 'email', 'role', 'verified'] });

    return users.length > 0 ? users : [];
  }
}
