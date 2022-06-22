import { InjectModel } from '@nestjs/mongoose';
import { Types, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import UserDto from '@v1/users/dto/user.dto';
import { RolesEnum } from '@decorators/roles.decorator';
import { UserDocument } from '@v1/users/schemas/users.schema';
import { User } from './schemas/users.schema';
import { IUpdateUser } from './interfaces/update-user-fields';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  public create(user: UserDto): Promise<User> {
    return this.userModel.create({
      ...user,
      role: RolesEnum.USER,
      verified: false,
    });
  }

  public async getByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      email,
    }).exec();
  }

  public async getById(id: Types.ObjectId): Promise<User | null> {
    return this.userModel.findOne({
      _id: id,
    }).exec();
  }

  public async getAll(): Promise<User[] | []> {
    const foundUsers: User[] | [] = await this.userModel.find({}, { password: false }).exec();

    return foundUsers.length > 0 ? foundUsers : [];
  }

  public getVerifiedUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      email,
      verified: true,
    }).exec();
  }

  public getVerifiedUserById(id: Types.ObjectId): Promise<User | null> {
    return  this.userModel.findOne({
      _id: id,
      verified: true,
    }).exec();
  }

  public findOneAndUpdate(_id: Types.ObjectId, fieldForUpdate: IUpdateUser) {
    return this.userModel.findByIdAndUpdate({ _id }, fieldForUpdate).exec();
  }
}
