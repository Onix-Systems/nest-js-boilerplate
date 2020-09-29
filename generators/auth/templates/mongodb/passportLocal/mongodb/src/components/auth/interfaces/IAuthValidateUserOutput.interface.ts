import { Types } from 'mongoose';

export interface IAuthValidateUserOutput {
  _id: Types.ObjectId;
  email?: string;
  verified: boolean;
}
