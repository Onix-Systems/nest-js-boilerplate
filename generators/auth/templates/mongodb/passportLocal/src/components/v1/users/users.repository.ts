import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectID } from 'mongodb';
import { Injectable } from '@nestjs/common';
import UserDto from '@components/v1/users/dto/user.dto';
import { RolesEnum } from '@decorators/roles.decorator';
import usersConstants from './users-constants';
import { UserEntity } from './schemas/users.schema';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectModel(usersConstants.models.users)
    private readonly userModel: Model<UserEntity>,
  ) {}

  public create(user: UserDto): Promise<UserEntity> {
    return this.userModel.create({
      ...user,
      role: RolesEnum.user,
      verified: true,
    });
  }

  public async getVerifiedByEmail(email: string): Promise<UserEntity | null> {
    const foundUser: UserEntity | null = await this.userModel.findOne({
      email,
      verified: true,
    });

    return foundUser || null;
  }

  public async getVerifiedById(id: ObjectID): Promise<UserEntity | null> {
    const foundUser: UserEntity | null = await this.userModel.findOne({
      _id: id,
      verified: true,
    });

    return foundUser || null;
  }

  public async getAll(): Promise<UserEntity[] | []> {
    const foundUsers: UserEntity[] | [] = await this.userModel.find({}, { password: false }).lean();

    return foundUsers.length > 0 ? foundUsers : [];
  }
}
