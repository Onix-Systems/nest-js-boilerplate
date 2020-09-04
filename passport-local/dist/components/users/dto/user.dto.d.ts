import { ObjectID } from 'typeorm';
export default class UserDto {
    _id?: ObjectID;
    email: string;
    password: string;
}
