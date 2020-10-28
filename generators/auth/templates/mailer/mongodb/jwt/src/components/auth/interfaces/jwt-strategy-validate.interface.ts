import { Types } from 'mongoose';

export interface JwtStrategyValidate {
  id: Types.ObjectId;
  email: string;
}
