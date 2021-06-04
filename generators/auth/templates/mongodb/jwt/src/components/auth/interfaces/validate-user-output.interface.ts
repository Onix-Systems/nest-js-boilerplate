import { Types } from 'mongoose';
import { RolesEnum } from '@decorators/roles.decorator';

export interface ValidateUserOutput {
  id: Types.ObjectId;
  email?: string;
  role?: RolesEnum;
}
