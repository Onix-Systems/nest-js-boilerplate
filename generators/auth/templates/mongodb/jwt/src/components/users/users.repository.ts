import { ObjectID } from 'mongodb';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import SignUpDto from '@components/auth/dto/sign-up.dto';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedUsersInterface } from '@interfaces/paginatedEntity.interface';
import { UserInterface } from '@components/users/interfaces/user.interface';
import { UserEntity } from './schemas/users.schema';

import UpdateUserDto from './dto/update-user.dto';

import usersConstants from './users-constants';
import PaginationUtils from '../../utils/pagination.utils';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectModel(usersConstants.models.users) private usersModel: Model<UserEntity>,
  ) {}

  public async create(user: SignUpDto): Promise<UserInterface> {
    const newUser = await this.usersModel.create({
      ...user,
      verified: false,
    });

    return newUser.toJSON();
  }

  public async getByEmail(email: string, verified: boolean = true): Promise<UserInterface | null> {
    const user = await this.usersModel.findOne({
      email,
      verified,
    }).exec();

    return user ? user.toJSON() : null;
  }

  public async getById(id: ObjectID, verified: boolean = true): Promise<UserInterface | null> {
    const user = await this.usersModel.findOne({
      _id: id,
      verified,
    }, { password: 0 }).exec();

    return user ? user.toJSON() : null;
  }

  public async updateById(id: ObjectID, data: UpdateUserDto): Promise<UserInterface | null> {
    const updatedUser = await this.usersModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
    ).exec();

    return updatedUser ? updatedUser.toJSON() : null;
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
        .exec(),
      this.usersModel.countDocuments({ verified })
        .exec(),
    ]);

    return { paginatedResult: users.map((user) => user.toJSON()), totalCount };
  }
}
