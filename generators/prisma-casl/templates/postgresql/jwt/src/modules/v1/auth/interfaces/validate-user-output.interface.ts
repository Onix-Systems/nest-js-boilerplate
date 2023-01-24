import { RolesEnum } from '@decorators/roles.decorator';

export interface ValidateUserOutput {
  id: number;
  email?: string;
  roles?: RolesEnum[];
}
