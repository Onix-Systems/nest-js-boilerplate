import { ObjectID } from 'typeorm';

export interface IAuthValidateUserOutput {
    id: ObjectID;
    email?: string;
}
