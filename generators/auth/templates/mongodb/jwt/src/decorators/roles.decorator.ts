import { SetMetadata } from '@nestjs/common';

export enum RolesEnum {
  ADMIN = 'admin',
  USER = 'user'
}

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
