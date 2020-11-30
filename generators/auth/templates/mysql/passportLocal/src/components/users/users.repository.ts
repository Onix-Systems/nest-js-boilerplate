import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from '@components/users/entities/user.entity';
import UserDto from '@components/users/dto/user.dto';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userModel: MongoRepository<UserEntity>,
  ) {}

  public create(user: UserDto): Promise<UserEntity> {
    return this.userModel.save({
      ...user,
      verified: true,
    });
  }

  public async getVerifiedByEmail(email: string): Promise<UserEntity | null> {
    const user: UserEntity | undefined = await this.userModel.findOne({
      email,
      verified: true,
    });

    return user || null;
  }

  public async getVerifiedById(id: number): Promise<UserEntity | null> {
    const user: UserEntity | undefined = await this.userModel.findOne({
      id,
      verified: true,
    });

    return user || null;
  }

  public async getAllVerified(): Promise<UserEntity[] | []> {
    const users: UserEntity[] | [] = await this.userModel.find({
      verified: true,
    });

    return users.length > 0 ? users : [];
  }
}
