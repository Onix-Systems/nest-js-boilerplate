import {
  Body,
  Controller,
  HttpCode,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Response,
  Request,
  UnauthorizedException,
  UseGuards,
  NotFoundException,
  ForbiddenException,
  HttpStatus,
  UseInterceptors,
  ConflictException,
  ServiceUnavailableException,
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
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

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
import MailerService from '@components/mailer/mailer.service';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { DecodedUser } from './interfaces/decoded-user.interface';
import LocalAuthGuard from './guards/local-auth.guard';
import AuthService from './auth.service';
import RefreshTokenDto from './dto/refresh-token.dto';
import SignInDto from './dto/sign-in.dto';
import SignUpDto from './dto/sign-up.dto';
import VerifyUserDto from './dto/verify-user.dto';
import JwtTokensDto from './dto/jwt-tokens.dto';
import ResetPasswordDto from './dto/reset-password.dto';
import NewPasswordDto from './dto/new-password.dto';

@ApiTags('Auth')
@UseInterceptors(WrapResponseInterceptor)
@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
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
    const foundUser: UserEntity = await this.usersService.getByEmail(
      verifyUserDto.email,
      false,
    );

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
    const decodedUser: DecodedUser = await this.authService.verifyToken(
      token, authConstants.jwt.secrets.accessToken,
    );

    await this.authService.deleteTokenByEmail(decodedUser.email);

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
    const decodedUser: DecodedUser = await this.authService.verifyToken(
      token,
      authConstants.jwt.secrets.accessToken,
    );

    const {
      exp,
      iat,
      ...user
    } = decodedUser;

    return new SuccessResponse(null, user);
  }

  @ApiBody({ type: ResetPasswordDto })
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
  @Post('password/send-reset-token')
  async sendResetToken(@Body() resetPasswordDto: ResetPasswordDto): Promise<SuccessResponse> {
    const user: UserEntity = await this.usersService.getByEmail(resetPasswordDto.email);

    const token: string = await this.authService.setResetToken(user.email, user._id);

    await this.mailerService.sendMail({
      toEmail: user.email,
      subject: authConstants.mailer.mails.resetPassword.subject,
      text: token,
    });

    return new SuccessResponse(null);
  }

  @ApiBody({ type: NewPasswordDto })
  @ApiNoContentResponse({
    type: NoContentResponse,
    description: 'No content. 204',
  })
  @ApiForbiddenResponse({
    type: ForbiddenException,
    description: 'Incorrect token',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('password/reset')
  async resetPassword(@Body() newPasswordDto: NewPasswordDto) {
    const token: string = await this.authService.validateResetToken(newPasswordDto.resetToken);

    const id: ObjectId = await this.authService.getIdByResetToken(newPasswordDto.resetToken);

    const hashedPassword: string = await bcrypt.hash(newPasswordDto.newPassword, 10);

    await this.usersService.update(id, {
      password: hashedPassword,
    });

    await this.authService.unsetResetToken(newPasswordDto.resetToken);

    return new NoContentResponse();
  }
}
