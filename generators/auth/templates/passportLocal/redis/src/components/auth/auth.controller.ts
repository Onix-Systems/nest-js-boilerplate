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
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ICreatedResponse } from '@interfaces/responses/ICreatedResponse.interface';

import LocalAuthGuard from '@components/auth/guards/local-auth.guard';
import AuthService from '@components/auth/auth.service';
import UsersService from '@components/users/users.service';
import UserDto from '@components/users/dto/user.dto';
import IsLoggedGuard from '@guards/isLogged.guard';
import IsNotLoggedGuard from '@guards/isNotLogged.guard';

@ApiTags('Auth')
@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOkResponse({ description: 'Renders a login page' })
  @ApiUnauthorizedResponse({ description: 'Returns an unauthorized ' })
  @Get('/login')
  @Render('login')
  index(@Request() req, @Res() res: Response): { message: string } {
    return { message: req.flash('loginError') };
  }

  @ApiOkResponse({ description: 'Redners a sign up page' })
  @ApiUnauthorizedResponse({ description: 'Returns the unauthorized error' })
  @Get('/sign-up')
  @Render('signup')
  async signup(@Request() req, @Res() res: Response): Promise<void> {}

  @ApiOkResponse({ description: 'Creates a user' })
  @ApiInternalServerErrorResponse({ description: 'Returns the 500 error' })
  @Post('/register')
  @Render('create')
  async create(
    @Body() params,
    @Request() req,
    @Res() res: Response,
  ): Promise<void> {
    await this.usersService.create(params);

    res.redirect('/');
  }

  @ApiOkResponse({ description: 'If logout is success' })
  @ApiInternalServerErrorResponse({ description: 'Internal error' })
  @Get('/logout')
  logout(@Request() req, @Res() res: Response): void {
    req.logout();
    res.redirect('/');
  }

  @ApiCookieAuth()
  @ApiOkResponse({ description: 'Returns 200 if login is ok' })
  @ApiInternalServerErrorResponse({
    description: 'Returns 500 if smth has been failed',
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req, @Res() res: Response): void {
    res.redirect('/home');
  }
}
