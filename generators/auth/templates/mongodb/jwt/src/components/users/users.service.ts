import * as bcrypt from 'bcrypt';

import { ObjectID } from 'mongodb';
import { Injectable } from '@nestjs/common';
import SignUpDto from '@components/auth/dto/sign-up.dto';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedUsersEntityInterface } from '@interfaces/paginatedEntity.interface';
import { UserEntity } from './schemas/users.schema';

import UsersRepository from './users.repository';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(user: SignUpDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.usersRepository.create({
      password: hashedPassword,
      email: user.email,
    });
  }

  public getByEmail(email: string, verified = true): Promise<UserEntity | null> {
    return this.usersRepository.getByEmail(email, verified);
  }

  public getById(id: ObjectID, verified = true): Promise<UserEntity | null> {
    return this.usersRepository.getById(id, verified);
  }

  public update(id: ObjectID, data: UpdateUserDto): Promise<UserEntity> {
    return this.usersRepository.updateById(id, data);
  }

  public async getAllVerifiedWithPagination(options: PaginationParamsInterface): Promise<PaginatedUsersEntityInterface> {
    return this.usersRepository.getAllVerifiedWithPagination(options);
  }

}
