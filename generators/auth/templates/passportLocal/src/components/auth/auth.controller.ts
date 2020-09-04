import {
  Body,
  Controller,
  HttpCode,
  Post,
  Delete,
  Request,
  UseGuards,
  Req,
} from '@nestjs/common';

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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return {
      message: 'Logged is successfully',
    };
  }

  @UseGuards(IsNotLoggedGuard)
  @Post('register')
  @HttpCode(201)
  async register(@Body() userDto: UserDto): Promise<ICreatedResponse> {
    await this.usersService.create(userDto);

    return {
      message: 'The item was created successfully',
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
