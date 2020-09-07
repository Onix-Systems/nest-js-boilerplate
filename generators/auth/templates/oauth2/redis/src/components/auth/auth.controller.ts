import {
  Controller,
  HttpCode,
  Delete,
  UseGuards,
  Req,
  Get,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiMovedPermanentlyResponse,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { ICreatedResponse } from '@interfaces/responses/ICreatedResponse.interface';

import UsersService from '@components/users/users.service';
import IsLoggedGuard from '@guards/isLogged.guard';
import AuthService from './auth.service';
import GoogleAuthGuard from './guards/google-auth.guard';

@ApiTags('Auth')
@Controller('google')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiMovedPermanentlyResponse({ description: 'Does redirect to route'})
  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  @ApiOkResponse({ description: 'User registered/authorized successfully '})
  @ApiInternalServerErrorResponse({ description: 'InternalServerError. User was not authorized/registered' })
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

  @ApiNoContentResponse({ description: 'user was deleted successfully' })
  @UseGuards(IsLoggedGuard)
  @Delete('logout')
  @HttpCode(204)
  async logout(@Req() req): Promise<boolean | never> {
    await req.logout();

    return true;
  }
}
