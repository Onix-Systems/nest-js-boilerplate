import { User } from '@v1/users/schemas/users.schema';

export interface PaginatedUsersInterface {
  readonly paginatedResult: User[] | [],
  readonly totalCount: number,
}
