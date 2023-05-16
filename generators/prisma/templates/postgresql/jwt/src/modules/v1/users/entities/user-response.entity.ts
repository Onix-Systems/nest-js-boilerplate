import { Exclude, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { RolesEnum } from '@decorators/roles.decorator';
import { UserEntity } from '@prisma/client';

export class UserResponseEntity implements UserEntity {
  id: number = 0;

  roles: RolesEnum[] = [RolesEnum.USER];

  verified: boolean = false;

  email: string = '';

  @Exclude()
  password: string = '';
}

export class AllUsersResponseEntity {
  @ValidateNested({ each: true })
  @Type(() => UserResponseEntity)
  data?: UserResponseEntity[] = []
}
