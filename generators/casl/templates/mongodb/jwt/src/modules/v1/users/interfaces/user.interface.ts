import { Types } from 'mongoose';
import { RolesEnum } from '@decorators/roles.decorator';

export interface UserInterface {
  readonly _id: Types.ObjectId;
  readonly email: string;
  readonly password?: string;
  readonly roles: RolesEnum[];
}
