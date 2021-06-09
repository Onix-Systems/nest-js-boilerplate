import { UserInterface } from '@components/users/interfaces/user.interface';

export interface PaginatedUsersInterface {
  readonly paginatedResult: UserInterface[] | [],
  readonly totalCount: number,
}
