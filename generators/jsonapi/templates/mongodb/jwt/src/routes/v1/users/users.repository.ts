import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import SignUpDto from '@v1/auth/dto/sign-up.dto';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedUsersInterface } from '@interfaces/paginatedEntity.interface';
import { UserDocument, User } from '@v1/users/schemas/users.schema';

import UpdateUserDto from './dto/update-user.dto';

import PaginationUtils from '@utils/pagination.utils';

@Injectable()
export default class UsersRepository {
  constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>) {}

  public async create(user: SignUpDto): Promise<User> {
    const newUser = await this.usersModel.create({
      ...user,
      verified: false,
    });

    return newUser.toObject();
  }

  public async getByEmail(email: string): Promise<User | null> {
    return this.usersModel.findOne({
      email,
    }).lean();
  }

  public async getVerifiedUserByEmail(email: string): Promise<User | null> {
    return this.usersModel.findOne({
      email,
      verified: true
    }).lean();
  }

  public async getUnverifiedUserByEmail(email: string): Promise<User | null> {
    return this.usersModel.findOne({
      email,
      verified: false
    }).lean();
  }

  public async getById(id: Types.ObjectId): Promise<User | null> {
    return this.usersModel.findOne({
      _id: id,
    }, { password: 0 }).lean();
  }

  public async getVerifiedUserById(id: Types.ObjectId): Promise<User | null> {
    return this.usersModel.findOne({
      _id: id,
      verified: true,
    }, { password: 0 }).lean();
  }

  public async getUnverifiedUserById(id: Types.ObjectId): Promise<User | null> {
    return this.usersModel.findOne({
      _id: id,
      verified: false,
    }, { password: 0 }).lean();
  }

  public async updateById(id: Types.ObjectId, data: UpdateUserDto): Promise<User | null> {
    return this.usersModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
    ).lean();
  }

  public async getAllVerifiedWithPagination(options: PaginationParamsInterface): Promise<PaginatedUsersInterface> {
    const verified = true;
    const [users, totalCount] = await Promise.all([
      this.usersModel.find({
        verified,
      }, {
        password: 0,
      })
        .limit(PaginationUtils.getLimitCount(options.limit))
        .skip(PaginationUtils.getSkipCount(options.page, options.limit))
        .lean(),
      this.usersModel.count({ verified })
        .lean(),
    ]);

    return { paginatedResult: users, totalCount };
  }
}
