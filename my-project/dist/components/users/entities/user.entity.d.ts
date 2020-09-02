import { ObjectID } from 'typeorm';
export default class UserEntity {
    id: ObjectID;
    password: string;
    email: string;
    verified: boolean;
}
