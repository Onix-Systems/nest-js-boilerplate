import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
  Render,
  Res,
  Request,
} from '@nestjs/common';
import { Response } from 'express';

import ParseObjectIdPipe from '@pipes/parseObjectId.pipe';
import IsLoggedGuard from '@guards/isLogged.guard';
import UsersService from './users.service';

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(IsLoggedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req: any, @Res() res: Response): {user: any} {
    return { user: req.user };
  }
}
