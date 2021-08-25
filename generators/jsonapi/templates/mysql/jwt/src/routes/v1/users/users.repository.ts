import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm/index';
import SignUpDto from '@v1/auth/dto/sign-up.dto';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedUsersInterface } from '@interfaces/paginatedEntity.interface';
import PaginationUtils from '@utils/pagination.utils';
import UpdateUserDto from './dto/update-user.dto';
import UserEntity from './schemas/user.entity';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersModel: Repository<UserEntity>,
  ) {}

  public create(user: SignUpDto): Promise<UserEntity> {
    return this.usersModel.save({
      ...user,
      verified: false,
    });
  }

  public async getByEmail(email: string): Promise<UserEntity | undefined> {
    return this.usersModel.findOne({
      where: [{
        email
      }],
    });
  }

  public async getVerifiedUserByEmail(email: string): Promise<UserEntity | undefined> {
    return this.usersModel.findOne({
      where: [{
        email,
        verified: true,
      }],
    });
  }

  public async getUnverifiedUserByEmail(email: string): Promise<UserEntity | undefined> {
    return this.usersModel.findOne({
      where: [{
        email,
        verified: false,
      }],
    });
  }

  public async getById(id: number): Promise<UserEntity | undefined> {
    return this.usersModel.findOne(id);
  }

  public async getVerifiedUserById(id: number): Promise<UserEntity | undefined> {
    return this.usersModel.findOne(id, {
      where: [{ verified: true }],
    });
  }

  public async getUnverifiedUserById(id: number): Promise<UserEntity | undefined> {
    return this.usersModel.findOne(id, {
      where: [{ verified: false }],
    });
  }

  public updateById(id: number, data: UpdateUserDto): Promise<UpdateResult> {
    return this.usersModel.update(id, data);
  }

  public async getAllVerifiedWithPagination(options: PaginationParamsInterface): Promise<PaginatedUsersInterface> {
    const verified = true;
    const [users, totalCount] = await Promise.all([
      this.usersModel.find({
        where: {
          verified,
        },
        skip: PaginationUtils.getSkipCount(options.page, options.limit),
        take: PaginationUtils.getLimitCount(options.limit),
      }),
      this.usersModel.count({
        where: { verified },
      }),
    ]);

    return { paginatedResult: users, totalCount };
  }
}
