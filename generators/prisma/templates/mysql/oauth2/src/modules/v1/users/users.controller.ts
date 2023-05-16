import {
  Controller,
  Get,
  NotFoundException,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import RequestUser from '@decorators/request-user.decorator';
import { Roles, RolesEnum } from '@decorators/roles.decorator';

import IsLoggedGuard from '@guards/is-logged.guard';
import RolesGuard from '@guards/roles.guard';
import { AllUsersResponseEntity, UserResponseEntity } from '@v1/users/entities/user-response.entity';
import Serialize from '@decorators/serialization.decorator';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import UsersService from './users.service';
import { FoundUsers } from './interfaces/found-users.interface';
import { UserEntity } from '@prisma/client';

@ApiTags('users')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    type: [UserResponseEntity],
    description: 'Returns all verified users',
  })
  @ApiUnauthorizedResponse({
    description: '401. UnauthorizedError',
  })
  @Get()
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Serialize(AllUsersResponseEntity)
  async getAllVerified(): Promise<FoundUsers[] | []> {
    const foundUsers: FoundUsers[] | [] = await this.usersService.getAll();

    return foundUsers;
  }

  @ApiOkResponse({
    type: UserResponseEntity,
    description: 'Returns a found user',
  })
  @ApiNotFoundResponse({ description: '404...' })
  @Get('/profile')
  @UseGuards(IsLoggedGuard)
  @Serialize(UserResponseEntity)
  async getById(
    @RequestUser() user: UserEntity,
  ): Promise<FoundUsers | never> {
    const foundUser = await this.usersService.getVerifiedUserById(user.id);

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return foundUser;
  }
}
