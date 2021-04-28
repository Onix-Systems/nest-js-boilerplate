import { UserEntity } from '@components/users/schemas/users.schema';

export interface PaginatedUsersEntityInterface {
  readonly paginatedResult: UserEntity[] | [],
  readonly totalCount: number,
}
