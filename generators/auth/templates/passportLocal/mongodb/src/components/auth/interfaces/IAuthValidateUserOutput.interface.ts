import { ObjectID } from 'typeorm';

export interface IAuthValidateUserOutput {
  _id: ObjectID;
  email?: string;
  verified: boolean;
}
