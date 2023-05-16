import {
  Type,
  Transform,
} from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ObjectId } from 'mongodb';
import { RolesEnum } from '@decorators/roles.decorator';

export class UserResponseDto {
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: ObjectId = new ObjectId();

  picture: string = '';

  firstName: string = '';

  lastName: string = '';

  roles: RolesEnum[] = [RolesEnum.USER];

  email: string = '';

  verified: boolean = true;
}

export default class UsersResponseDto {
  @ValidateNested({ each: true })
  @Type(() => UserResponseDto)
  data?: UserResponseDto[] = []
}
