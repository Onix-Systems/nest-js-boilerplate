import {
  Controller,
  Get,
  NotFoundException,
  Param, ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

import RequestUser from '@decorators/request-user.decorator';
import { Roles, RolesEnum } from '@decorators/roles.decorator';

import IsLoggedGuard from '@guards/is-logged.guard';
import RolesGuard from '@guards/roles.guard';
import UserEntity from './entities/user.entity';
import UsersService from './users.service';

@ApiTags('users')
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    type: [UserEntity],
    description: 'Returns all verified users',
  })
  @ApiUnauthorizedResponse({
    description: '401. UnauthorizedError',
  })
  @Get()
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.admin)
  async getAllVerified(): Promise<UserEntity[] | []> {
    const foundUsers: UserEntity[] | [] = await this.usersService.getAll();
  
    return foundUsers;
  }

  @ApiOkResponse({
    type: UserEntity,
    description: 'Returns a found user',
  })
  @ApiNotFoundResponse({ description: '404...' })
  @Get('/profile')
  @UseGuards(IsLoggedGuard)
  async getById(
    @RequestUser() user: UserEntity,
  ): Promise<UserEntity | never> {
    const foundUser = await this.usersService.getById(user.id);

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return foundUser;
  }
}
