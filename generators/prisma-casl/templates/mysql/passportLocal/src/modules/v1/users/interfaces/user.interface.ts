import { RoleEntity } from '@prisma/client';

export interface ICreateUser {
  email: string;

  password: string;

  roles: RoleEntity[];
}
