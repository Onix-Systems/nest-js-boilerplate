import { ObjectID } from 'typeorm';
export default class UserDto {
    id?: ObjectID;
    email: string;
    password: string;
}
