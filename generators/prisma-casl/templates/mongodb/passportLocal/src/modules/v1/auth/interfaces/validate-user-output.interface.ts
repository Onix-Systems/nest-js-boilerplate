import { RolesEnum } from '@decorators/roles.decorator';

export interface ValidateUserOutput {
  readonly id: string;

  readonly email?: string;

  readonly verified: boolean;

  readonly roles?: RolesEnum[];
}
