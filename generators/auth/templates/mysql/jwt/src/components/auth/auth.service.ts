import * as Redis from 'ioredis';
import * as bcrypt from 'bcrypt';

import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'nestjs-redis';

import UsersService from '@components/users/users.service';

import { DecodedUser } from '@components/auth/interfaces/decoded-user.interface';
import JwtTokensDto from './dto/jwt-tokens.dto';
import { ValidateUserOutput } from './interfaces/validate-user-output.interface';
import { LoginPayload } from './interfaces/login-payload.interface';

import authConstants from './auth-constants';

@Injectable()
export default class AuthService {
  private readonly redisClient: Redis.Redis;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {
    this.redisClient = redisService.getClient();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<null | ValidateUserOutput> {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new NotFoundException('The item does not exist');
    }

    const passwordCompared = await bcrypt.compare(password, user.password);

    if (passwordCompared) {
      return {
        id: user.id,
        email: user.email,
      };
    }

    return null;
  }

  async login(data: LoginPayload): Promise<JwtTokensDto> {
    const payload: LoginPayload = {
      id: data.id,
      email: data.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.accessToken,
      secret: authConstants.jwt.secrets.accessToken,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.refreshToken,
      secret: authConstants.jwt.secrets.refreshToken,
    });

    await this.redisClient.set(
      payload.email as string,
      refreshToken,
      'EX',
      authConstants.redis.expirationTime.jwt.refreshToken,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  getRefreshTokenByEmail(email: string): Promise<string | null> {
    return this.redisClient.get(email);
  }

  deleteTokenByEmail(email: string): Promise<number> {
    return this.redisClient.del(email);
  }

  deleteAllTokens(): Promise<string> {
    return this.redisClient.flushall();
  }

  async verifyToken(token: string, secret: string): Promise<DecodedUser | null> {
    try {
      const user = await this.jwtService.verifyAsync(token, { secret });

      return user;
    } catch (error) {
      return null;
    }
  }
}
