import { ObjectID } from 'typeorm';

export interface IJwtStrategyValidate {
    id: ObjectID;
    email: string;
}
