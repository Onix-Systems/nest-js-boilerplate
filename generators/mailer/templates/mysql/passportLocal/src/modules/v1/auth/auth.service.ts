import * as bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';

import UsersService from '@v1/users/users.service';
import { ValidateUserOutput } from './interfaces/validate-user-output.interface';
import authConstants from './auth-constants';

@Injectable()
export default class AuthService {
  constructor(private readonly usersService: UsersService) { }

  public async validateUser(
    email: string,
    password: string,
  ): Promise<null | ValidateUserOutput> {
    const user = await this.usersService.getVerifiedUserByEmail(email);

    if (!user) {
      throw new NotFoundException('The item does not exist');
    }

    const passwordCompared = await bcrypt.compare(password, user.password);

    if (passwordCompared) {
      return {
        id: user.id,
        email: user.email,
        verified: user.verified,
        role: user.role,
      };
    }

    return null;
  }

  createVerifyToken(id: number) {
    return new Promise((resolve, reject) => {
      const { key, iv } = authConstants.verifyEmail.token;
      const cipherStream = crypto.createCipheriv('aes-256-cbc', key, iv);
      let encryptedData = '';

      cipherStream.on('data', data => {
        encryptedData += data.toString('hex');
      });
      cipherStream.on('error', error => {
        reject(error);
      });

      cipherStream.write(String(id));
      cipherStream.end();
      resolve(encryptedData);
    });
  }

  verifyEmailVerToken(token: string): any {
    return new Promise((resolve, reject) => {
      const { key, iv } = authConstants.verifyEmail.token;
      const decipherStream = crypto.createDecipheriv('aes-256-cbc', key, iv);
      let decryptedData: string = '';

      decipherStream.on('data', data => {
        decryptedData += data;
      });
      decipherStream.on('end', () => {
        try {
          const id = parseInt(decryptedData, 10);
          resolve(id);
        } catch (error) {
          resolve(null);
        }
      });
      decipherStream.on('error', error => {
        reject(error);
      });
      decipherStream.write(token, 'hex');
      decipherStream.end();
    });
  }
}
