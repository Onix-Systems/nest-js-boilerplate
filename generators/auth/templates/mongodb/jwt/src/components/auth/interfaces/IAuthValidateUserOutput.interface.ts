import { Types } from 'mongoose';

export interface IAuthValidateUserOutput {
  id: Types.ObjectId;
  email?: string;
}
