import {
  Body,
  Controller,
  HttpCode,
  Get,
  Post,
  Delete,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
  NotFoundException,
  ForbiddenException,
  HttpStatus, UseInterceptors,
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
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Request as ExpressRequest } from 'express';
import { ConfigService } from '@nestjs/config';

import UsersService from '@v1/users/users.service';
import JwtAccessGuard from '@guards/jwt-access.guard';
import RolesGuard from '@guards/roles.guard';
import { User } from '@v1/users/schemas/users.schema';
import AuthBearer from '@decorators/auth-bearer.decorator';
import { Roles, RolesEnum } from '@decorators/roles.decorator';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import authConstants from './auth-constants';
import { DecodedUser } from './interfaces/decoded-user.interface';
import LocalAuthGuard from './guards/local-auth.guard';
import AuthService from './auth.service';
import RefreshTokenDto from './dto/refresh-token.dto';
import SignInDto from './dto/sign-in.dto';
import SignUpDto from './dto/sign-up.dto';
import VerifyUserDto from './dto/verify-user.dto';
import JwtTokensDto from './dto/jwt-tokens.dto';
import UsersEntity from '@v1/users/entity/user.entity';

@ApiTags('Auth')
@ApiExtraModels(JwtTokensDto)
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @ApiBody({ type: SignInDto })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(JwtTokensDto),
        },
      },
    },
    description: 'Returns jwt tokens',
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: [
          {
            target: {
              email: 'string',
              password: 'string',
            },
            value: 'string',
            property: 'string',
            children: [],
            constraints: {},
          },
        ],
        error: 'Bad Request',
      },
    },
    description: '400. ValidationException',
  })
  @ApiInternalServerErrorResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
    description: '500. InternalServerError',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req: ExpressRequest): Promise<JwtTokensDto> {
    const user = req.user as User;

    return this.authService.login(user);
  }

  @ApiBody({ type: SignUpDto })
  @ApiOkResponse({
    description: '201, Success',
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: [
          {
            target: {
              email: 'string',
              password: 'string',
            },
            value: 'string',
            property: 'string',
            children: [],
            constraints: {},
          },
        ],
        error: 'Bad Request',
      },
    },
    description: '400. ValidationException',
  })
  @ApiConflictResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '409. ConflictResponse',
  })
  @ApiInternalServerErrorResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
    description: '500. InternalServerError',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async signUp(@Body() user: SignUpDto): Promise<User> {
    return this.usersService.create(user);
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(JwtTokensDto),
        },
      },
    },
    description: '200, returns new jwt tokens',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. Token has been expired',
  })
  @ApiInternalServerErrorResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
    description: '500. InternalServerError',
  })
  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<JwtTokensDto | never> {
    const decodedUser = this.jwtService.decode(
      refreshTokenDto.refreshToken,
    ) as DecodedUser;

    if (!decodedUser) {
      throw new ForbiddenException('Incorrect token');
    }

    const oldRefreshToken:
      | string
      | null = await this.authService.getRefreshTokenByEmail(decodedUser.email);

    // if the old refresh token is not equal to request refresh token then this user is unauthorized
    if (!oldRefreshToken || oldRefreshToken !== refreshTokenDto.refreshToken) {
      throw new UnauthorizedException(
        'Authentication credentials were missing or incorrect',
      );
    }

    const payload = {
      _id: decodedUser._id,
      email: decodedUser.email,
      role: decodedUser.role,
    };

    return this.authService.login(payload);
  }

  @ApiNoContentResponse({
    description: 'No content. 204',
  })
  @ApiNotFoundResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        error: 'Not Found',
      },
    },
    description: 'User was not found',
  })
  @ApiInternalServerErrorResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
    description: '500. InternalServerError',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.admin)
  @Put('verify')
  async verifyUser(@Body() verifyUserDto: VerifyUserDto): Promise<User | null> {
    const foundUser = await this.usersService.getUnverifiedUserByEmail(
      verifyUserDto.email,
    ) as UsersEntity;

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return this.usersService.update(foundUser._id, { verified: true });
  }

  @ApiNoContentResponse({
    description: 'no content',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: 'Token has been expired',
  })
  @ApiInternalServerErrorResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
    description: '500. InternalServerError',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Delete('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@AuthBearer() token: string): Promise<{} | never> {
    const decodedUser: DecodedUser | null = await this.authService.verifyToken(
      token,
      this.configService.get<string>('ACCESS_TOKEN') || '<%= config.accessTokenSecret %>',
    );

    if (!decodedUser) {
      throw new ForbiddenException('Incorrect token');
    }

    const deletedUsersCount = await this.authService.deleteTokenByEmail(
      decodedUser.email,
    );

    if (deletedUsersCount === 0) {
      throw new NotFoundException();
    }

    return {};
  }

  @ApiNoContentResponse({
    description: 'no content',
  })
  @ApiInternalServerErrorResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
    description: '500. InternalServerError',
  })
  @ApiBearerAuth()
  @Delete('logout-all')
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logoutAll(): Promise<{}> {
    return this.authService.deleteAllTokens();
  }

  @ApiOkResponse({
    type: User,
    description: '200, returns a decoded user from access token',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '403, says you Unauthorized',
  })
  @ApiInternalServerErrorResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
    description: '500. InternalServerError',
  })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Get('token')
  async getUserByAccessToken(
    @AuthBearer() token: string,
  ): Promise<DecodedUser | never> {
    const decodedUser: DecodedUser | null = await this.authService.verifyToken(
      token,
      this.configService.get<string>('ACCESS_TOKEN') || '<%= config.accessTokenSecret %>',
    );

    if (!decodedUser) {
      throw new ForbiddenException('Incorrect token');
    }

    const { exp, iat, ...user } = decodedUser;

    return user;
  }
}
