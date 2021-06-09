import { Types } from 'mongoose';

export interface UserPayload {
  readonly id: Types.ObjectId;

  readonly email: string;

  readonly role: string;
}
