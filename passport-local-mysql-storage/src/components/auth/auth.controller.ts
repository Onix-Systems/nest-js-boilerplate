import {
  Body,
  Controller,
  HttpCode,
  Post,
  Delete,
  Request,
  UseGuards,
  Res,
  Render,
  Get,
} from '@nestjs/common';

import { Response } from 'express';
import { ICreatedResponse } from '@interfaces/responses/ICreatedResponse.interface';

import LocalAuthGuard from '@components/auth/guards/local-auth.guard';
import AuthService from '@components/auth/auth.service';
import UsersService from '@components/users/users.service';
import UserDto from '@components/users/dto/user.dto';
import IsLoggedGuard from '@guards/isLogged.guard';
import IsNotLoggedGuard from '@guards/isNotLogged.guard';

@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/login')
  @Render('login')
  index(@Request() req, @Res() res: Response): {message: string} {
    return { message: req.flash('loginError') };
  }

  @Get('/sign-up')
  @Render('signup')
  async signup(@Request() req, @Res() res: Response): Promise<void> {}

  @Post('/register')
  @Render('create')
  async create(@Body() params, @Request() req, @Res() res: Response): Promise<void> {
    await this.usersService.create(params);

    res.redirect('/');
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response): void {
    req.logout();
    res.redirect('/');
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req, @Res() res: Response): void {
    res.redirect('/home');
  }
}
