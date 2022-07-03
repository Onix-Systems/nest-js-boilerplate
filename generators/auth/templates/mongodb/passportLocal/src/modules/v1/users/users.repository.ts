import { InjectModel } from '@nestjs/mongoose';
import { Types, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import UserDto from './dto/user.dto';
import { RolesEnum } from '@decorators/roles.decorator';
import { UserDocument, User } from '@v1/users/schemas/users.schema';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  public create(user: UserDto): Promise<UserDocument> {
    return this.userModel.create({
      ...user,
      roles: [RolesEnum.USER],
      verified: true,
    });
  }

  public async getVerifiedUserByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({
      email,
      verified: true,
    }).exec();
  }

  public async getVerifiedUserById(id: Types.ObjectId): Promise<UserDocument | null> {
    return  this.userModel.findOne({
      _id: id,
      verified: true,
    }).exec();
  }

  public async getAll(): Promise<UserDocument[] | []> {
    return this.userModel.find({}, { password: false }).exec();
  }
}
