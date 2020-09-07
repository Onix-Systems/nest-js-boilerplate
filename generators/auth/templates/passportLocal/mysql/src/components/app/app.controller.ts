import { Controller, Render, UseGuards, Get, Res, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiCookieAuth,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import IsLoggedGuard from '@guards/isLogged.guard';

@ApiTags('App')
@Controller()
export default class AppController {
  @ApiCookieAuth()
  @ApiOkResponse({ description: 'Returns the logged user' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Returns the unauthorized error'})
  @UseGuards(IsLoggedGuard)
  @Get('/home')
  @Render('home')
  getHome(@Req() req, @Res() res: Response): { user } {
    return { user: req.user };
  }
}
