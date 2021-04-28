import { ObjectID } from 'mongodb';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import SignUpDto from '@components/auth/dto/sign-up.dto';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedUsersEntityInterface } from '@interfaces/paginatedEntity.interface';
import { UserEntity } from './schemas/users.schema';

import UpdateUserDto from './dto/update-user.dto';

import usersConstants from './users-constants';
import PaginationUtils from '../../utils/pagination.utils';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectModel(usersConstants.models.users) private usersModel: Model<UserEntity>,
  ) {}

  public create(user: SignUpDto): Promise<UserEntity> {
    return this.usersModel.create({
      ...user,
      verified: false,
    });
  }

  public getByEmail(email: string, verified: boolean = true): Promise<UserEntity | null> {
    return this.usersModel.findOne({
      email,
      verified,
    }).exec();
  }

  public getById(id: ObjectID, verified: boolean = true): Promise<UserEntity | null> {
    return this.usersModel.findOne({
      _id: id,
      verified,
    }, { password: 0 }).exec();
  }

  public updateById(id: ObjectID, data: UpdateUserDto): Promise<UserEntity> {
    return this.usersModel.updateOne(
      {
        _id: id,
      },
      {
        $set: data,
      },
    ).exec();
  }

  public async getAllVerifiedWithPagination(options: PaginationParamsInterface): Promise<PaginatedUsersEntityInterface> {
    const results = await Promise.all([
      this.usersModel.find({
        verified: true,
      }, { password: 0 }).limit(PaginationUtils.getLimitCount(options.limit)).skip(PaginationUtils.getSkipCount(options.page, options.limit)),
      this.usersModel.countDocuments({ verified: true }),
    ]);

    return { paginatedResult: results[0], totalCount: results[1] };
  }
}
