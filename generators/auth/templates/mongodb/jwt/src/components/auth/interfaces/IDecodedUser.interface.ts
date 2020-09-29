import { Types } from 'mongoose';

export interface IDecodedUser {
  readonly _id: Types.ObjectId;

  readonly email: string;

  readonly password: string;

  readonly iat: number;

  readonly exp: number;
}
