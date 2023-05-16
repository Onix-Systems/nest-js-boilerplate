import * as bcrypt from 'bcryptjs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import SignUpDto from '@v1/auth/dto/sign-up.dto';

import { RolesEnum } from '@decorators/roles.decorator';
import RolesService from '@v1/roles/roles.service';

import { UserEntity } from '@prisma/client';
import UsersRepository from './users.repository';
import UpdateUserDto from './dto/update-user.dto';
import { FoundUsers } from './interfaces/found-users.interface';

@Injectable()
export default class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesService: RolesService,
  ) {
  }

  public async create(user: SignUpDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const role = await this.rolesService.getByName(RolesEnum.USER);

    if (!role) {
      throw new InternalServerErrorException('Role not found');
    }

    return this.usersRepository.create({
      ...user,
      password: hashedPassword,
      roles: [role],
    });
  }

  public async getByEmail(email: string): Promise<UserEntity | null | void> {
    return this.usersRepository.getByEmail(email);
  }

  public getUnverifiedUserByEmail(email: string): Promise<UserEntity | null | void> {
    return this.usersRepository.getUnverifiedUserByEmail(email);
  }

  public getVerifiedUserByEmail(email: string): Promise<any | null | void> {
    return this.usersRepository.getVerifiedUserByEmail(email);
  }

  public async getVerifiedUserById(id: number): Promise<FoundUsers | null | void> {
    return this.usersRepository.getVerifiedUserById(id);
  }

  public async getUnverifiedUserById(id: number): Promise<UserEntity | null | void> {
    return this.usersRepository.getUnverifiedUserById(id);
  }

  public update(id: number, data: UpdateUserDto) {
    return this.usersRepository.updateById(id, data);
  }

  public getAll(): Promise<UserEntity[] | []> {
    return this.usersRepository.getAll();
  }

  public getVerifiedUsers(): Promise<FoundUsers[] | []> {
    return this.usersRepository.getVerifiedUsers();
  }
}
