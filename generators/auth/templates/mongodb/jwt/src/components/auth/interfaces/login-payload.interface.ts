import { Types } from 'mongoose';
import { RolesEnum } from '@decorators/roles.decorator';

export interface LoginPayload {
  readonly id?: Types.ObjectId;

  readonly email?: string;

  readonly role?: RolesEnum;
}
