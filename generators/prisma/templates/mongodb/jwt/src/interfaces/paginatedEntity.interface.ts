import { User } from '@prisma/client';

export interface PaginatedUsersInterface {
  readonly paginatedResult: User[] | [],
  readonly totalCount: number,
}
