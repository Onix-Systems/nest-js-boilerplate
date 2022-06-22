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
  Param,
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
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import UsersService from '@v1/users/users.service';
import SignInDto from '@v1/auth/dto/sign-in.dto';
import IsNotLoggedGuard from '@guards/is-not-logged.guard';
import RedirectIfLoggedGuard from '@guards/redirect-if-logged.guard';
import LocalAuthGuard from './guards/local-auth.guard';
import AuthService from './auth.service';
import SignUpDto from './dto/sign-up.dto';

@ApiTags('Auth')
@Controller()
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
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
  @Redirect('/v1/auth/login')
  public async create(@Body() params: SignUpDto): Promise<void> {
    const { email, id } = await this.usersService.create(params);
    const token = await this.authService.createVerifyToken(id);
    await this.mailerService.sendMail({
      to: email,
      from: this.configService.get<string>('MAILER_FROM_EMAIL'),
      subject: 'Email Verification',
      template: `${process.cwd()}/public/views/mailer/templates/verify-password`,
      context: {
        token,
        email,
        host: this.configService.get<number>('SERVER_HOST'),
      },
    });
  }

  @ApiMovedPermanentlyResponse({ description: '301. If logout is success' })
  @ApiInternalServerErrorResponse({ description: 'Internal error' })
  @Get('/logout')
  @Redirect('/v1/auth/login')
  public logout(@Request() req: ExpressRequest): Promise<void> {
    return new Promise((resolve, reject) => {
      req.logout((error: any) => {
        if (error) {
          reject(error);
        }

        resolve();
      });
    });
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

  @Get('verify/:token')
  @Redirect('/v1/home')
  async verifyUser(
    @Req() req: ExpressRequest,
    @Param('token') token: string,
  ): Promise<any> {
    const id = await this.authService.verifyEmailVerToken(token);
    if (!id) {
      return {
        message: req.flash('The user does not exist'),
      };
    }
    const foundUser = await this.usersService.verifyUser(id);
    if (!foundUser) {
      return {
        message: req.flash('The user does not exist'),
      };
    }
  }
}
