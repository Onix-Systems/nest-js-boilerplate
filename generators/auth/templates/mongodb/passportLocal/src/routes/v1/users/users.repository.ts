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

  public async getVerifiedByEmail(email: string): Promise<User | null> {
    const foundUser: User | null = await this.userModel.findOne({
      email,
      verified: true,
    });

    return foundUser || null;
  }

  public async getVerifiedById(id: Types.ObjectId): Promise<User | null> {
    const foundUser: User | null = await this.userModel.findOne({
      _id: id,
      verified: true,
    });

    return foundUser || null;
  }

  public async getAll(): Promise<User[] | []> {
    const foundUsers: User[] | [] = await this.userModel.find({}, { password: false }).lean();

    return foundUsers.length > 0 ? foundUsers : [];
  }
}
