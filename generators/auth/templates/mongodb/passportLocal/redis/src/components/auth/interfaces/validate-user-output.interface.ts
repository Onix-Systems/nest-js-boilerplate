import { Types } from 'mongoose';

export interface ValidateUserOutput {
  readonly _id: Types.ObjectId;

  readonly email?: string;

  readonly verified: boolean;
}
