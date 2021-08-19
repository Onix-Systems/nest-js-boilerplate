import UserEntity from '@v1/users/schemas/user.entity';

export interface PaginatedUsersInterface {
  readonly paginatedResult: UserEntity[] | [],
  readonly totalCount: number,
}
