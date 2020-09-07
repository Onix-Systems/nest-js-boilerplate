import { ObjectID } from 'typeorm';
export default class UserEntity {
    _id: ObjectID;
    picture: string;
    firstName: string;
    lastName: string;
    email: string;
    verified: boolean;
}
