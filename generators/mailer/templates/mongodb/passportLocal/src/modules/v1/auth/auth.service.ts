import * as bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import UsersService from '@v1/users/users.service';
import { UserDocument } from '@v1/users/schemas/users.schema';
import { ValidateUserOutput } from './interfaces/validate-user-output.interface';
import authConstants from './auth-constants';

@Injectable()
export default class AuthService {
  constructor(private readonly usersService: UsersService) { }

  async validateUser(
    email: string,
    password: string,
  ): Promise<null | ValidateUserOutput> {
    const user = await this.usersService.getVerifiedUserByEmail(email) as UserDocument;

    if (!user) {
      throw new NotFoundException('The item does not exist');
    }

    const passwordCompared = await bcrypt.compare(password, user.password);

    if (passwordCompared) {
      return {
        _id: user._id,
        email: user.email,
        role: user.role,
        verified: user.verified,
      };
    }

    return null;
  }

  createVerifyToken(id: Types.ObjectId) {
    return new Promise((resolve, reject) => {
      const { key, iv } = authConstants.verifyEmail.token;
      const cipherStream = crypto.createCipheriv('aes-256-cbc', key, iv);
      let encryptedData = '';

      cipherStream.on('data', (data) => {
        encryptedData += data.toString('hex');
      });
      cipherStream.on('error', (error) => {
        reject(error);
      });

      cipherStream.write(id.toString());
      cipherStream.end();
      resolve(encryptedData);
    });
  }

  verifyEmailVerToken(token: string): any {
    return new Promise((resolve, reject) => {
      const { key, iv } = authConstants.verifyEmail.token;
      const decipherStream = crypto.createDecipheriv('aes-256-cbc', key, iv);
      let decryptedData: string = '';

      decipherStream.on('data', (data) => {
        decryptedData += data;
      });
      decipherStream.on('end', () => {
        try {
          const _id = new ObjectId(decryptedData);
          resolve(_id);
        } catch (error) {
          resolve(null);
        }
      });
      decipherStream.on('error', (error) => {
        reject(error);
      });
      decipherStream.write(token, 'hex');
      decipherStream.end();
    });
  }
}
