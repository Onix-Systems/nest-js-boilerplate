import { Types } from 'mongoose';

export interface IJwtStrategyValidate {
  id: Types.ObjectId;
  email: string;
}
