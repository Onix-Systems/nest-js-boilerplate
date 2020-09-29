import {
  Controller,
  Get,
  UseGuards,
  Render,
  Res,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCookieAuth,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import IsLoggedGuard from '@guards/isLogged.guard';
import ProfileDto from './dto/profile.dto';
import UsersService from './users.service';
import UserEntity from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCookieAuth()
  @ApiOkResponse({
    type: ProfileDto,
    description: 'Returns 200 if the template has been rendered successfully',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(IsLoggedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req: any, @Res() res: Response): ProfileDto {
    return { user: req.user };
  }

  @ApiCookieAuth()
  @ApiOkResponse({
    type: [UserEntity],
    description: 'Returns 200 if the template has been rendered successfully',
  })
  @Get()
  async getAllUsers(): Promise<UserEntity[] | []> {
    const foundUsers = await this.usersService.getAll();

    return foundUsers;
  }
}
