import { RolesEnum } from '@decorators/roles.decorator';

export interface JwtStrategyValidate {
  id: number;
  email: string;
  role: RolesEnum;
}
