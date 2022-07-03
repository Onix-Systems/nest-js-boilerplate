import { Types } from 'mongoose';
import { RolesEnum } from '@decorators/roles.decorator';

export interface ValidateUserOutput {
  _id: Types.ObjectId;
  email?: string;
  roles?: RolesEnum[];
}
