import { Types } from 'mongoose';

export interface DecodedUser {
  readonly id: Types.ObjectId;

  readonly email: string;

  readonly password: string;

  readonly iat: number;

  readonly exp: number;
}
