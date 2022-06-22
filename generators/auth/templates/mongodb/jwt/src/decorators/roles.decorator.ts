import { SetMetadata } from '@nestjs/common';

export enum RolesEnum {
  ADMIN = 'admin',
  USER = 'user'
}

export type RolesAuthType = RolesEnum[] | RolesEnum | void;

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
