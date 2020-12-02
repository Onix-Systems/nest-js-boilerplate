import { Types } from 'mongoose';

export interface ValidateUserOutput {
  id: Types.ObjectId;
  email?: string;
}
