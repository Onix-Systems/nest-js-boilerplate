import { InjectModel } from '@nestjs/mongoose';
import { Types, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import UserDto from './dto/user.dto';
import { RolesEnum } from '@decorators/roles.decorator';
import { User } from './schemas/users.schema';
import { UserDocument } from '@v1/users/schemas/users.schema';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  public create(user: UserDto): Promise<User> {
    return this.userModel.create({
      ...user,
      role: RolesEnum.user,
      verified: true,
    });
  }

  public async getVerifiedUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      email,
      verified: true,
    });
  }

  public async getVerifiedUserById(id: Types.ObjectId): Promise<User | null> {
    return  this.userModel.findOne({
      _id: id,
      verified: true,
    });
  }

  public async getAll(): Promise<User[] | []> {
    return this.userModel.find({}, { password: false }).lean();
  }
}
