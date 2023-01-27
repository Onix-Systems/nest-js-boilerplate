import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseEntity } from '../entities/user-response.entity';

export default class ProfileDto {
  @ApiProperty({ type: UserResponseEntity })
  readonly user: User | null = null;
}
