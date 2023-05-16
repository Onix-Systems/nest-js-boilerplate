import { User } from '@v1/users/schemas/users.schema';
import { ApiProperty } from '@nestjs/swagger';

export default class ProfileDto {
  @ApiProperty({ type: User })
  readonly user: User | null = null;
}
