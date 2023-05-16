import * as bcrypt from 'bcryptjs';

import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import UsersRepository from '@v1/users/users.repository';
import { DecodedUser } from './interfaces/decoded-user.interface';
import JwtTokensDto from './dto/jwt-tokens.dto';
import { ValidateUserOutput } from './interfaces/validate-user-output.interface';
import { LoginPayload } from './interfaces/login-payload.interface';

import authConstants from './auth-constants';
import AuthRepository from './auth.repository';

@Injectable()
export default class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly authRepository: AuthRepository,
    private readonly configService: ConfigService,
  ) { }

  public async validateUser(
    email: string,
    password: string,
  ): Promise<null | ValidateUserOutput> {
    const user = await this.usersRepository.getVerifiedUserByEmail(email);

    if (!user) {
      throw new NotFoundException('The item does not exist');
    }

    const passwordCompared = await bcrypt.compare(password, user.password);

    if (passwordCompared) {
      return {
        id: user.id,
        email: user.email,
        roles: user.roles,
      };
    }

    return null;
  }

  public async login(data: LoginPayload): Promise<JwtTokensDto> {
    const payload: LoginPayload = {
      _id: data._id,
      email: data.email,
      roles: data.roles,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.accessToken,
      secret: this.configService.get<string>('ACCESS_TOKEN') || '283f01ccce922bcc2399e7f8ded981285963cec349daba382eb633c1b3a5f282',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.refreshToken,
      secret: this.configService.get<string>('REFRESH_TOKEN') || 'c15476aec025be7a094f97aac6eba4f69268e706e603f9e1ec4d815396318c86',
    });

    await this.authRepository.addRefreshToken(
      payload.email as string,
      refreshToken,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  public getRefreshTokenByEmail(email: string): Promise<string | null> {
    return this.authRepository.getToken(email);
  }

  public deleteTokenByEmail(email: string): Promise<number> {
    return this.authRepository.removeToken(email);
  }

  public deleteAllTokens(): Promise<string> {
    return this.authRepository.removeAllTokens();
  }

  public async verifyToken(token: string, secret: string): Promise<DecodedUser | null> {
    try {
      const user = (await this.jwtService.verifyAsync(token, { secret })) as DecodedUser | null;

      return user;
    } catch (error) {
      return null;
    }
  }
}
