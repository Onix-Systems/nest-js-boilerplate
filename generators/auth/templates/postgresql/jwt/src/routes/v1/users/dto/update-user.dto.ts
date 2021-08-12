import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

import SignUpDto from '@v1/auth/dto/sign-up.dto';

export default class UpdateUserDto extends PartialType(SignUpDto) {
  @ApiPropertyOptional({
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  readonly verified: boolean = false;
}
