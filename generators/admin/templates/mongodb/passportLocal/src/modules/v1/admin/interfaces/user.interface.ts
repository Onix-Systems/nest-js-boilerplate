import { RolesEnum } from '@decorators/roles.decorator';

export interface ICreateUser {
  email: string;

  password: string;

  verified: boolean;

  roles: RolesEnum[];
}
