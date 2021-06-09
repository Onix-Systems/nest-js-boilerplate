import * as bcrypt from 'bcrypt';

import { ObjectID } from 'mongodb';
import { Injectable } from '@nestjs/common';
import SignUpDto from '@components/auth/dto/sign-up.dto';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedUsersInterface } from '@interfaces/paginatedEntity.interface';

import { UserInterface } from '@components/users/interfaces/user.interface';
import UsersRepository from './users.repository';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export default class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(user: SignUpDto): Promise<UserInterface> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.usersRepository.create({
      password: hashedPassword,
      email: user.email,
    });
  }

  public getByEmail(
    email: string,
    verified = true,
  ): Promise<UserInterface | null> {
    return this.usersRepository.getByEmail(email, verified);
  }

  public getById(id: ObjectID, verified = true): Promise<UserInterface | null> {
    return this.usersRepository.getById(id, verified);
  }

  public update(
    id: ObjectID,
    data: UpdateUserDto,
  ): Promise<UserInterface | null> {
    return this.usersRepository.updateById(id, data);
  }

  public async getAllVerifiedWithPagination(
    options: PaginationParamsInterface,
  ): Promise<PaginatedUsersInterface> {
    return this.usersRepository.getAllVerifiedWithPagination(options);
  }
}
