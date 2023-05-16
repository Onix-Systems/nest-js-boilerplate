import * as bcrypt from 'bcryptjs';

import { Injectable, InternalServerErrorException } from '@nestjs/common';

import RolesService from '@v1/roles/roles.service';
import { RolesEnum } from '@decorators/roles.decorator';
import { UserEntity } from '@prisma/client';

import UserDto from './dto/user.dto';
import UsersRepository from './users.repository';
import { FoundUsers } from './interfaces/found-users.interface';

@Injectable()
export default class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesService: RolesService,
  ) { }

  public async create(userDto: UserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    const role = await this.rolesService.getByName(RolesEnum.USER);

    if (!role) {
      throw new InternalServerErrorException('Role not found');
    }

    return this.usersRepository.create({
      password: hashedPassword,
      email: userDto.email,
      roles: [role],
    });
  }

  public getVerifiedUserByEmail(email: string): Promise<FoundUsers | null> {
    return this.usersRepository.getVerifiedUserByEmail(email);
  }

  public getUnverifiedUserByEmail(email: string): Promise<FoundUsers | null> {
    return this.usersRepository.getUnverifiedUserByEmail(email);
  }

  public getVerifiedUserById(id: number): Promise<FoundUsers | void> {
    return this.usersRepository.getVerifiedUserById(id);
  }

  public getUnverifiedUserById(id: number): Promise<UserEntity | null> {
    return this.usersRepository.getUnverifiedUserById(id);
  }

  public getAll(): Promise<FoundUsers[] | []> {
    return this.usersRepository.getAll();
  }
}
