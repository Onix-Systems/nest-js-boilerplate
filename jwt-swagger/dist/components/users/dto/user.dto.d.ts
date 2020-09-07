import { ObjectID } from 'mongodb';
export default class UserDto {
    _id?: ObjectID;
    email: string;
    password: string;
}
