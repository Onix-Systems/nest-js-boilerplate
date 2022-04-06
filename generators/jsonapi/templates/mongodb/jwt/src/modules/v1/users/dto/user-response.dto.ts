import { Exclude, Type, Transform } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ObjectId } from 'mongodb';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { RolesEnum } from '@decorators/roles.decorator';

class Data {
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: ObjectId = new ObjectId();

  role: RolesEnum = RolesEnum.user;

  verified: boolean = false;

  email: string = '';

  @Exclude()
  password: string = '';
}

export default class UserResponseDto {
  @ValidateNested({ each: true })
  @Type(() => Data)
  data?: Data[] = []

  collectionName?: string = '';

  options?: {
    location: string,
    paginationParams: PaginationParamsInterface,
    totalCount: number,
  }
}
