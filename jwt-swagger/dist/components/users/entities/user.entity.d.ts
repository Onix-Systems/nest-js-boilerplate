import { ObjectID } from 'typeorm';
export default class UserEntity {
    _id: ObjectID;
    password: string;
    email: string;
    verified: boolean;
}
