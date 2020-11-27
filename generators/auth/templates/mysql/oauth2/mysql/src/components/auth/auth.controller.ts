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
import { Request as ExpressRequest } from 'express';

import UsersService from '@components/users/users.service';
import IsLoggedGuard from '@guards/is-logged.guard';
import SuccessResponse from '@responses/success.response';
import { UserGooglePayload } from '@components/auth/interfaces/user-google-payload.interface';
import UserDto from '@components/users/dto/user.dto';
import NoContentResponse from '@responses/no-content.response';
import GoogleAuthGuard from './guards/google-auth.guard';
import AuthService from './auth.service';

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
  async googleAuth(@Req() req: ExpressRequest) {}

  @ApiOkResponse({
    type: SuccessResponse,
    description: 'User registered/authorized successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'InternalServerError. User was not authorized/registered',
  })
  @UseGuards(GoogleAuthGuard)
  @Get('redirect')
  async googleAuthRedirect(@Req() req: ExpressRequest): Promise<SuccessResponse | never> {
    if (!req.user) {
      throw new ForbiddenException('No user from google');
    }

    const { accessToken, refreshToken, ...user } = req.user as UserGooglePayload;

    const foundUser = await this.usersService.getByEmail(user.email as string);

    if (!foundUser) {
      await this.usersService.create(user as UserDto);
    }

    return new SuccessResponse('Successfully registered');
  }

  @ApiNoContentResponse({ type: NoContentResponse })
  @UseGuards(IsLoggedGuard)
  @Delete('logout')
  @HttpCode(204)
  async logout(@Req() req: ExpressRequest): Promise<NoContentResponse | never> {
    await req.logout();

    return new NoContentResponse();
  }
}
