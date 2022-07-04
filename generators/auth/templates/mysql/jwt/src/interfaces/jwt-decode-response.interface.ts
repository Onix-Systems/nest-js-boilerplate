import { RolesEnum } from '@decorators/roles.decorator';

export interface JwtDecodeResponse {
  id: number,
  email: string,
  roles: RolesEnum[],
  iat: number,
  exp: number,
}
