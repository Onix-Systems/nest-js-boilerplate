import {
  Controller,
  HttpCode,
  Delete,
  UseGuards,
  Req,
  Get,
  ForbiddenException,
} from '@nestjs/common';

import { ICreatedResponse } from '@interfaces/responses/ICreatedResponse.interface';

import UsersService from '@components/users/users.service';
import IsLoggedGuard from '@guards/isLogged.guard';
import AuthService from './auth.service';
import GoogleAuthGuard from './guards/google-auth.guard';

@Controller('google')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req): Promise<ICreatedResponse | never> {
    if (!req.user) {
      throw new ForbiddenException('No user from google');
    }

    const { accessToken, refreshToken, ...user } = req.user;

    const foundUser = await this.usersService.getByEmail(user.email);

    if (!foundUser) {
      await this.usersService.createIfDoesNotExist(user);
    }

    return {
      message: 'The user was registered',
    };
  }

  @UseGuards(IsLoggedGuard)
  @Delete('logout')
  @HttpCode(204)
  async logout(@Req() req): Promise<boolean | never> {
    await req.logout();

    return true;
  }
}
