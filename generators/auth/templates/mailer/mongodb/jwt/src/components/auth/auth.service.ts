import * as Redis from 'ioredis';
import * as bcrypt from 'bcrypt';

import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'nestjs-redis';

import UsersService from '@components/users/users.service';

import { DecodedUser } from '@components/auth/interfaces/decoded-user.interface';
import { ObjectId } from 'mongodb';
import crypto from 'crypto';
import UserEntity from '@components/users/entities/user.entity';
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
        id: user._id,
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

  async deleteTokenByEmail(email: string): Promise<number> {
    const deletedUsersCount = await this.redisClient.del(email);

    if (deletedUsersCount === 0) {
      throw new NotFoundException();
    }

    return deletedUsersCount;
  }

  deleteAllTokens(): Promise<string> {
    return this.redisClient.flushall();
  }

  async verifyToken(token: string, secret: string): Promise<DecodedUser> {
    try {
      const user: DecodedUser = await this.jwtService.verifyAsync(token, { secret });

      return user;
    } catch (error) {
      throw new ForbiddenException('Incorrect token');
    }
  }

  async setResetToken(email: String, userId: ObjectId): Promise<string> {
    const token: string = crypto.randomBytes(32).toString('hex');

    try {
      await this.redisClient.set(
          token as string,
          email as string,
      );
    } catch {
      throw new ConflictException('Token has not been generated');
    }

    return token;
  }

  async unsetResetToken(token: string): Promise<number> {
    return this.redisClient.del(token);
  }

  async validateResetToken(token: string): Promise<string> {
    const tokenFound = await this.redisClient.get(token);

    if (!tokenFound) {
      throw new NotFoundException('Token not found');
    }

    return tokenFound;
  }

  async getEmailByResetToken(token: string): Promise<string | null> {
    return this.redisClient.get(token);
  }

  async getIdByResetToken(token: string): Promise<ObjectId> {
    const email: string | null = await this.redisClient.get(token);

    if (!email) {
      throw new NotFoundException('Wrong token');
    }

    const userEnity: UserEntity = await this.usersService.getByEmail(email);

    return userEnity._id;
  }
}
