import RoleEntity from '@v1/roles/schemas/role.entity';

export interface ICreateUser {
  email: string;

  picture: string;

  firstName: string;

  lastName?: string;

  roles: RoleEntity[];
}
