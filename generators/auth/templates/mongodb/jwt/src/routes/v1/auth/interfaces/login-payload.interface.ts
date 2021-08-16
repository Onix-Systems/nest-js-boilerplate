import { Types } from 'mongoose';

export interface LoginPayload {
  readonly _id?: Types.ObjectId;

  readonly email: string;

  readonly role: string;
}
