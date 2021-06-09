import { UserEntity } from '@components/v1/users/schemas/users.schema';
import { ApiProperty } from '@nestjs/swagger';

export default class ProfileDto {
  @ApiProperty({ type: UserEntity })
  readonly user: UserEntity | null = null;
}
