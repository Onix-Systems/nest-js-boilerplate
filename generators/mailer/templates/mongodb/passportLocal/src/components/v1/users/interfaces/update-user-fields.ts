import { ObjectID } from 'mongodb';

export interface IUpdateUser {
  readonly [key: string]: string | boolean | number | ObjectID;
}
