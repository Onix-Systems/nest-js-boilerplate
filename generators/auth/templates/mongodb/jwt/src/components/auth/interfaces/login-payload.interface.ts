import { Types } from 'mongoose';

export interface LoginPayload {
  readonly id?: Types.ObjectId;

  readonly email?: string;
}
