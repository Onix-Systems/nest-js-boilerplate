import { Controller, Render, UseGuards, Get, Res, Req } from '@nestjs/common';
import { Response } from 'express';

import IsLoggedGuard from '@guards/isLogged.guard';

@Controller()
export default class AppController {
  @UseGuards(IsLoggedGuard)
  @Get('/home')
  @Render('home')
  getHome(@Req() req, @Res() res: Response): {user: any } {
    return { user: req.user };
  }
}
