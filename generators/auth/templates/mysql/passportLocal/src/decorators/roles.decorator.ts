import { SetMetadata } from '@nestjs/common';

export enum RolesEnum {
  admin = 'admin',
  user = 'user'
}

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
