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

  public async getByEmail(email: string, verified: boolean = true): Promise<UserEntity | null> {
    const user: UserEntity | undefined = await this.usersModel.findOne({
      where: [{
        email,
        verified,
      }],
    });

    return user || null;
  }

  public async getById(id: number, verified: boolean = true): Promise<UserEntity | null> {
    const foundUser: UserEntity | undefined = await this.usersModel.findOne(id, {
      where: [{ verified }],
    });

    return foundUser || null;
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

    return { paginatedResult: users.map((user) => user), totalCount };
  }
}
