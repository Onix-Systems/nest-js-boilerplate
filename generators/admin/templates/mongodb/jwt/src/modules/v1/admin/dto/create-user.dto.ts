import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty, ArrayUnique, IsArray, IsBoolean, IsEnum, IsOptional,
} from 'class-validator';

import SignInDto from '@v1/auth/dto/sign-in.dto';
import { ICreateUser } from '@v1/admin/interfaces/user.interface';
import { RolesEnum } from '@decorators/roles.decorator';

export default class CreateUserDto extends SignInDto {
  constructor({
    email,
    password,
    roles,
    verified,
  }: ICreateUser) {
    super({ email, password });

    this.roles = roles;
    this.verified = verified;
  }

  @ApiProperty({ type: [RolesEnum], default: [RolesEnum.USER] })
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsArray()
  @IsEnum(RolesEnum, { each: true })
  readonly roles: RolesEnum[];

  @ApiProperty({ type: Boolean, default: false })
  @IsOptional()
  @IsBoolean()
  readonly verified: boolean = false;
}
