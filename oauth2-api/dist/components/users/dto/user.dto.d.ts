import { ObjectID } from 'typeorm';
export default class UserDto {
    readonly _id?: ObjectID;
    readonly email: string;
    readonly picture: string;
    readonly firstName: string;
    readonly lastName?: string;
}
