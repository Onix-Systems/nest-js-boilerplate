import {
  Body,
  Controller,
  HttpCode,
  Post,
  Delete,
  Param,
  Request,
  UnauthorizedException,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

import UsersService from '@components/users/users.service';
import UserDto from '@components/users/dto/user.dto';
import JwtAuthGuard from '@guards/jwt-auth.guard';
import CreatedResponse from '@dto/createdResponse.dto';

import { IAuthLoginOutput } from './interfaces/IAuthLoginOutput.interface';
import LocalAuthGuard from './guards/local-auth.guard';
import AuthService from './auth.service';
import RefreshTokenDto from './dto/refreshToken.dto';
import SignInDto from './dto/signIn.dto';
import SignUpDto from './dto/signUp.dto';

@ApiTags('Auth')
@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ description: 'Returns jwt tokens' })
  @ApiInternalServerErrorResponse({ description: '500. InternalServerError' })
  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBody({ type: SignUpDto })
  @ApiOkResponse({ description: '200, Success' })
  @ApiInternalServerErrorResponse({ description: '500. InternalServerError' })
  @Post('sign-up')
  async signUp(@Body() userDto: UserDto): Promise<CreatedResponse> {
    await this.usersService.create(userDto);

    return {
      message: 'The item was created successfully',
    };
  }

  @ApiOkResponse({ description: '200, returns new jwt tokens' })
  @ApiUnauthorizedResponse({ description: '401. Token has been expired' })
  @ApiInternalServerErrorResponse({ description: '500. InternalServerError ' })
  @ApiBearerAuth()
  @Post('refreshToken')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<IAuthLoginOutput | never> {
    const verifiedUser = this.jwtService.verify(refreshTokenDto.refreshToken);

    const oldRefreshToken: string = await this.authService.getRefreshTokenByEmail(
      verifiedUser.email,
    );

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

  @ApiOkResponse({ description: '200, returns new jwt tokens' })
  @ApiUnauthorizedResponse({ description: '401. Token has been expired' })
  @ApiInternalServerErrorResponse({ description: '500. InternalServerError ' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('logout/:token')
  @HttpCode(204)
  async logout(@Param('token') token: string): Promise<void | never> {
    const { email } = this.jwtService.verify(token);

    const deletedUserCount = await this.authService.deleteTokenByEmail(email);

    if (deletedUserCount === 0) {
      throw new NotFoundException('The item does not exist');
    }
  }

  @ApiOkResponse({ description: '200, returns new jwt tokens' })
  @ApiInternalServerErrorResponse({ description: '500. InternalServerError' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('logoutAll')
  @HttpCode(204)
  async logoutAll(): Promise<void> {
    await this.authService.deleteAllTokens();
  }
}
