import { Types } from 'mongoose';
import { RolesEnum } from '@decorators/roles.decorator';

export interface ValidateUserOutput {
  readonly _id: Types.ObjectId;

  readonly email?: string;

  readonly verified: boolean;

  readonly role?: RolesEnum;
}
