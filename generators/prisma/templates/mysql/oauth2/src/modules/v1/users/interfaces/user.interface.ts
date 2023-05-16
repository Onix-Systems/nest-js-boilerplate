import { RoleEntity } from "@prisma/client";

export interface ICreateUser {
  email: string;

  picture: string;

  firstName: string;

  lastName?: string;

  roles: RoleEntity[];
}
