import { ObjectId } from 'mongodb';

export interface IUpdateUser {
  readonly [key: string]: string | boolean | number | ObjectId;
}
