import { Exclude, Type, Transform } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ObjectId } from 'mongodb';
import { RolesEnum } from '@decorators/roles.decorator';

export class UserResponseDto {
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: ObjectId = new ObjectId();

  roles: RolesEnum[] = [RolesEnum.USER];

  verified: boolean = false;

  email: string = '';

  @Exclude()
  password: string = '';
}

export default class UsersResponseDto {
  @ValidateNested({ each: true })
  @Type(() => UserResponseDto)
  data?: UserResponseDto[] = []
}
