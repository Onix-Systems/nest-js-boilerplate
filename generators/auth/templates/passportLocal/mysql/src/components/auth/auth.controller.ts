import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Res,
  Render,
  Get,
  HttpCode,
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
import { Response } from 'express';

import UsersService from '@components/users/users.service';
import SignInDto from '@components/auth/dto/signIn.dto';
import LocalAuthGuard from './guards/local-auth.guard';
import AuthService from './auth.service';
import SignUpDto from './dto/signUp.dto';

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

  @ApiMovedPermanentlyResponse({ description: 'Redirects to home' })
  @ApiInternalServerErrorResponse({ description: 'Returns the 500 error' })
  @Post('/register')
  @Render('create')
  async create(
    @Body() params: SignUpDto,
    @Request() req,
    @Res() res: Response,
  ): Promise<void> {
    await this.usersService.create(params);

    res.redirect('/');
  }

  @ApiMovedPermanentlyResponse({ description: '301. If logout is success' })
  @ApiInternalServerErrorResponse({ description: 'Internal error' })
  @Get('/logout')
  logout(@Request() req, @Res() res: Response): void {
    req.logout();
    res.redirect('/');
  }

  @ApiCookieAuth()
  @ApiBody({ type: SignInDto })
  @ApiMovedPermanentlyResponse({ description: 'Returns 301 if login is ok' })
  @ApiInternalServerErrorResponse({
    description: 'Returns 500 if smth has been failed',
  })
  @HttpCode(301)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req, @Res() res: Response): void {
    res.redirect('/home');
  }
}
