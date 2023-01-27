import { Types } from 'mongoose';

import { RolesEnum } from '@decorators/roles.decorator';

export interface LoginPayload {
  readonly _id?: Types.ObjectId;

  readonly email: string;

  readonly roles: RolesEnum[];
}
