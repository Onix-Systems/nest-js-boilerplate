import { RolesEnum } from '@decorators/roles.decorator';

export interface JwtDecodeResponse {
  id: number,
  email: string,
  role: RolesEnum,
  iat: number,
  exp: number,
}
