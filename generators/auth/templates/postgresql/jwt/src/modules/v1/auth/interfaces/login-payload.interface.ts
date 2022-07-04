import { RolesEnum } from '@decorators/roles.decorator';

export interface LoginPayload {
  readonly id?: number;

  readonly email?: string;

  readonly roles?: RolesEnum[];
}
