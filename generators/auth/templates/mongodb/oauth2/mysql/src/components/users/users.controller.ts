import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Types } from 'mongoose';

import ParseObjectIdPipe from '@pipes/parse-object-id.pipe';
import IsLoggedGuard from '@guards/is-logged.guard';
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
  @UseGuards(IsLoggedGuard)
  async getAllVerified(): Promise<UserEntity[] | []> {
    const foundUsers: UserEntity[] | [] = await this.usersService.getAll(true);

    return foundUsers;
  }

  @ApiOkResponse({
    type: UserEntity,
    description: 'Returns a found user',
  })
  @ApiNotFoundResponse({ description: '404...' })
  @Get(':id')
  @UseGuards(IsLoggedGuard)
  async getById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<UserEntity | never> {
    const foundUser = await this.usersService.getById(id);

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return foundUser;
  }
}
