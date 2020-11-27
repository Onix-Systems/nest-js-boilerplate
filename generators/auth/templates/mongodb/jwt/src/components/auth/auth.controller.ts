import {
  Body,
  Controller,
  HttpCode,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Request,
  UnauthorizedException,
  UseGuards,
  NotFoundException,
  ForbiddenException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Request as ExpressRequest } from 'express';

import UsersService from '@components/users/users.service';
import JwtAccessGuard from '@guards/jwt-access.guard';
import UserEntity from '@components/users/entities/user.entity';
import SuccessResponse from '@responses/success.response';
import CreatedResponse from '@responses/created.response';
import NoContentResponse from '@responses/no-content.response';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import AuthBearer from '@decorators/auth-bearer.decorator';
import AppUtils from '@components/app/app.utils';
import ServerErrorResponse from '@responses/server-error.response';
import BadRequestResponse from '@responses/bad-request.response';
import ConflictResponse from '@responses/conflict.response';
import UnauthorizedResponse from '@responses/unauthorized.response';
import NotFoundResponse from '@responses/not-found.response';
import authConstants from '@components/auth/auth-constants';
import { DecodedUser } from './interfaces/decoded-user.interface';
import LocalAuthGuard from './guards/local-auth.guard';
import AuthService from './auth.service';
import RefreshTokenDto from './dto/refresh-token.dto';
import SignInDto from './dto/sign-in.dto';
import SignUpDto from './dto/sign-up.dto';
import VerifyUserDto from './dto/verify-user.dto';
import JwtTokensDto from './dto/jwt-tokens.dto';

@ApiTags('Auth')
@UseInterceptors(WrapResponseInterceptor)
@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  @ApiBody({ type: SignInDto })
  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(JwtTokensDto),
    description: 'Returns jwt tokens',
  })
  @ApiInternalServerErrorResponse({
    type: ServerErrorResponse,
    description: '500. InternalServerError',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req: ExpressRequest, @Body() input: SignInDto): Promise<SuccessResponse> {
    const { password, ...user } = req.user as UserEntity;

    const tokens = await this.authService.login(user);

    return new SuccessResponse(null, tokens);
  }

  @ApiBody({ type: SignUpDto })
  @ApiOkResponse({
    type: CreatedResponse,
    description: '201, Success',
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
    description: '400. ValidationException',
  })
  @ApiConflictResponse({
    type: ConflictResponse,
    description: '409. ConflictResponse',
  })
  @ApiInternalServerErrorResponse({
    type: ServerErrorResponse,
    description: '500. InternalServerError',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async signUp(@Body() user: SignUpDto): Promise<CreatedResponse> {
    await this.usersService.create(user);

    return new CreatedResponse();
  }

  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(JwtTokensDto),
    description: '200, returns new jwt tokens',
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: '401. Token has been expired',
  })
  @ApiInternalServerErrorResponse({
    type: ServerErrorResponse,
    description: '500. InternalServerError ',
  })
  @ApiBearerAuth()
  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<SuccessResponse | never> {
    const decodedUser = this.jwtService.decode(refreshTokenDto.refreshToken) as DecodedUser;

    if (!decodedUser) {
      throw new ForbiddenException('Incorrect token');
    }

    const oldRefreshToken: string | null = await this.authService.getRefreshTokenByEmail(
      decodedUser.email,
    );

    // if the old refresh token is not equal to request refresh token then this user is unauthorized
    if (!oldRefreshToken || oldRefreshToken !== refreshTokenDto.refreshToken) {
      throw new UnauthorizedException('Authentication credentials were missing or incorrect');
    }

    const payload = {
      id: decodedUser.id,
      email: decodedUser.email,
    };

    const newTokens = await this.authService.login(payload);

    return new SuccessResponse(null, newTokens);
  }

  @ApiNoContentResponse({
    type: NoContentResponse,
    description: 'No content. 204',
  })
  @ApiNotFoundResponse({
    type: NotFoundResponse,
    description: 'User was not found',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('verify')
  async verifyUser(@Body() verifyUserDto: VerifyUserDto): Promise<NoContentResponse | never> {
    const foundUser = await this.usersService.getByEmail(
      verifyUserDto.email,
      false,
    );

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    await this.usersService.update(foundUser._id, { verified: true });

    return new NoContentResponse();
  }

  @ApiNoContentResponse({
    type: NoContentResponse,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: 'Token has been expired',
  })
  @ApiInternalServerErrorResponse({
    type: ServerErrorResponse,
    description: 'InternalServerError',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Delete('logout/:token')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Param('token') token: string): Promise<NoContentResponse | never> {
    const decodedUser: DecodedUser | null = await this.authService.verifyToken(
      token, authConstants.jwt.secrets.accessToken,
    );

    if (!decodedUser) {
      throw new ForbiddenException('Incorrect token');
    }

    const deletedUsersCount = await this.authService.deleteTokenByEmail(decodedUser.email);

    if (deletedUsersCount === 0) {
      throw new NotFoundException();
    }

    return new NoContentResponse();
  }

  @ApiNoContentResponse({
    type: NoContentResponse,
  })
  @ApiInternalServerErrorResponse({ description: '500. InternalServerError' })
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Delete('logout-all')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logoutAll(): Promise<NoContentResponse> {
    await this.authService.deleteAllTokens();

    return new NoContentResponse();
  }

  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(UserEntity),
    description: '200, returns a decoded user from access token',
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: '403, says you Unauthorized',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Get('token')
  async getUserByAccessToken(@AuthBearer() token: string): Promise<SuccessResponse> | never {
    const decodedUser: DecodedUser | null = await this.authService.verifyToken(
      token,
      authConstants.jwt.secrets.accessToken,
    );

    if (!decodedUser) {
      throw new ForbiddenException('Incorrect token');
    }

    const {
      exp,
      iat,
      ...user
    } = decodedUser;

    return new SuccessResponse(null, user);
  }
}
