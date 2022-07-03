import { RolesEnum } from '@decorators/roles.decorator';

export interface JwtDecodeResponse {
  id: string,
  email: string,
  roles: RolesEnum[],
  iat: number,
  exp: number,
}
