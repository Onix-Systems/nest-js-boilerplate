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
  ) {}

  public async create(user: UserDto): Promise<UserEntity> {
    const role = await this.rolesService.getByName(RolesEnum.USER);

    if (!role) {
      throw new InternalServerErrorException('Role not found');
    }

    return this.usersRepository.create({
      ...user,
      roles: [role],
    });
  }

  public getAll(): Promise<FoundUsers[] | []> {
    return this.usersRepository.find();
  }

  public async getByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.getByEmail(email);
  }

  public async getVerifiedUserByEmail(email: string) : Promise<FoundUsers | null> {
    return this.usersRepository.getVerifiedUserByEmail(email);
  }

  public async getById(id: number): Promise<UserEntity | null> {
    return this.usersRepository.getById(id);
  }

  public async getVerifiedUserById(id: number): Promise<FoundUsers | void> {
    return this.usersRepository.getVerifiedUserById(id);
  }
}
