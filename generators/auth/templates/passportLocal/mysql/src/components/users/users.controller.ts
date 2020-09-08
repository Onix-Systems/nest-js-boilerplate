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
import {
  ApiTags,
  ApiCookieAuth,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import ParseObjectIdPipe from '@pipes/parseObjectId.pipe';
import IsLoggedGuard from '@guards/isLogged.guard';
import UsersService from './users.service';

@ApiTags('Users')
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'Returns 200 if the template has been rendered successfully',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(IsLoggedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req: any, @Res() res: Response): { user: any } {
    return { user: req.user };
  }
}
