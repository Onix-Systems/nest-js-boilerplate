import {
  Body,
  Controller,
  HttpCode,
  Post,
  Delete,
  Param,
  Request, UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

import { UserDto } from '../users/dto/user.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

import { IAuthLoginOutput } from './interfaces/IAuthLoginOutput.interface';
import { INoContentResponse } from '../../shared/interfaces/responses/INoContentResponse.interface';
import { ICreatedResponse } from '../../shared/interfaces/responses/ICreatedResponse.interface';
import { IVerbUnauthorized } from '../../shared/interfaces/responses/IVerbUnauthorized.interface';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
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

    const oldRefreshToken: string = await this.authService.getRefreshTokenByLogin(verifiedUser.login);

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
  async logout(@Param('token') token: string): Promise<INoContentResponse> {
    const { login } = this.jwtService.verify(token);

    await this.authService.deleteTokenByLogin(login);
    return;
  }

  @Delete('logoutAll')
  @HttpCode(204)
  async logoutAll(): Promise<INoContentResponse> {
    await this.authService.deleteAllTokens();
    return;
  }
}
