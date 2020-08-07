import {
  Body,
  Controller,
  HttpCode,
  Post,
  Delete,
  Param,
  Request, UnauthorizedException,
  UseGuards, NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IAuthLoginOutput } from '@components/auth/interfaces/IAuthLoginOutput.interface';
import { ICreatedResponse } from '@shared/interfaces/responses/ICreatedResponse.interface';
import { IVerbUnauthorized } from '@shared/interfaces/responses/IVerbUnauthorized.interface';

import LocalAuthGuard from '@components/auth/guards/local-auth.guard';
import AuthService from '@components/auth/auth.service';
import UsersService from '@components/users/users.service';
import UserDto from '@components/users/dto/user.dto';
import RefreshTokenDto from '@components/auth/dto/refreshToken.dto';

@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @HttpCode(201)
  async register(@Body() userDto: UserDto): Promise<ICreatedResponse> {
    await this.usersService.create(userDto);

    return {
      message: 'The item was created successfully',
    };
  }

  @Post('refreshToken')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<IAuthLoginOutput | IVerbUnauthorized> {
    const verifiedUser = this.jwtService.verify(refreshTokenDto.refreshToken);

    const oldRefreshToken: string = await this.authService.getRefreshTokenByEmail(verifiedUser.email);

    // if the old refresh token is not equal to request refresh token then this user is unauthorized
    if (!oldRefreshToken || oldRefreshToken !== refreshTokenDto.refreshToken) {
      throw new UnauthorizedException('Authentication credentials were missing or incorrect');
    }

    const payload = {
      id: verifiedUser.id,
      email: verifiedUser.email,
    };

    const newTokens = await this.authService.login(payload);

    return newTokens;
  }

  @Delete('logout/:token')
  @HttpCode(204)
  async logout(@Param('token') token: string): Promise<boolean | never> {
    const { email } = this.jwtService.verify(token);

    const deletedUserCount = await this.authService.deleteTokenByEmail(email);

    if (deletedUserCount === 0) {
      throw new NotFoundException('The item does not exist');
    }

    return true;
  }

  @Delete('logoutAll')
  @HttpCode(204)
  async logoutAll(): Promise<boolean> {
    await this.authService.deleteAllTokens();

    return true;
  }
}
