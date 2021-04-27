import { UserEntity } from '@components/users/schemas/users.schema';

export interface PaginatedUsersEntityInterface {
  paginatedResult: UserEntity[] | [],
  totalCount: number,
}
