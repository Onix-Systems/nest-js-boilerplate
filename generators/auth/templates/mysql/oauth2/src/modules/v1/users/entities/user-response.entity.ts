import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { RolesEnum } from '@decorators/roles.decorator';

export class UserResponseEntity {
  id: number = 0;

  role: RolesEnum = RolesEnum.USER;

  verified: boolean = false;

  firstName: string = '';

  lastName: string = '';

  picture: string = '';

  email: string = '';
}

export class AllUsersResponseEntity {
  @ValidateNested({ each: true })
  @Type(() => UserResponseEntity)
  data?: UserResponseEntity[] = []
}
