import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Render,
  Get,
  HttpCode,
  Req,
  HttpStatus,
  Redirect,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiCookieAuth,
  ApiMovedPermanentlyResponse,
  ApiBody,
} from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

import UsersService from '@components/users/users.service';
import SignInDto from '@components/auth/dto/sign-in.dto';
import IsNotLoggedGuard from '@guards/is-not-logged.guard';
import RedirectIfLoggedGuard from '@guards/redirect-if-logged.guard';
import LocalAuthGuard from './guards/local-auth.guard';
import AuthService from './auth.service';
import SignUpDto from './dto/sign-up.dto';

@ApiTags('Auth')
@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOkResponse({ description: 'Renders a login page' })
  @ApiUnauthorizedResponse({ description: 'Returns an unauthorized ' })
  @UseGuards(RedirectIfLoggedGuard)
  @Get('/login')
  @Render('login')
  public index(@Req() req: ExpressRequest) {
    return {
      message: req.flash('loginError'),
    };
  }

  @ApiOkResponse({ description: 'Redners a sign up page' })
  @ApiUnauthorizedResponse({ description: 'Returns the unauthorized error' })
  @UseGuards(IsNotLoggedGuard)
  @Get('/sign-up')
  @Render('signup')
  public async signUp(): Promise<void> {}

  @ApiMovedPermanentlyResponse({ description: 'Redirects to home' })
  @ApiInternalServerErrorResponse({ description: 'Returns the 500 error' })
  @Post('/register')
  @Redirect('/auth/login')
  public async create(@Body() params: SignUpDto): Promise<void> {
    await this.usersService.create(params);
  }

  @ApiMovedPermanentlyResponse({ description: '301. If logout is success' })
  @ApiInternalServerErrorResponse({ description: 'Internal error' })
  @Get('/logout')
  @Redirect('/auth/login')
  public logout(@Request() req: ExpressRequest): void {
    req.logout();
  }

  @ApiCookieAuth()
  @ApiBody({ type: SignInDto })
  @ApiMovedPermanentlyResponse({ description: 'Returns 301 if login is ok' })
  @ApiInternalServerErrorResponse({
    description: 'Returns 500 if smth has been failed',
  })
  @HttpCode(HttpStatus.MOVED_PERMANENTLY)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @Redirect('/home')
  public login(): void {}
}
