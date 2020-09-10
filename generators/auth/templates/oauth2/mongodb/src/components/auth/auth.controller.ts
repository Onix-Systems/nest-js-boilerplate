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

import UsersService from '@components/users/users.service';
import IsLoggedGuard from '@guards/isLogged.guard';
import CreatedResponseDto from '@dto/createdResponse.dto';
import AuthService from './auth.service';
import GoogleAuthGuard from './guards/google-auth.guard';

@ApiTags('Auth')
@Controller('google')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiMovedPermanentlyResponse({ description: 'Does redirect to route' })
  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  @ApiOkResponse({
    type: CreatedResponseDto,
    description: 'User registered/authorized successfully ',
  })
  @ApiInternalServerErrorResponse({
    description: 'InternalServerError. User was not authorized/registered',
  })
  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req): Promise<CreatedResponseDto | never> {
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

  @ApiNoContentResponse({ description: 'User was signed out successfully' })
  @UseGuards(IsLoggedGuard)
  @Delete('logout')
  @HttpCode(204)
  async logout(@Req() req): Promise<void | never> {
    await req.logout();
  }
}
