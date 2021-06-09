import { ApiProperty } from '@nestjs/swagger';

export default class VerifyUserDto {
  @ApiProperty({ type: String })
  readonly email: string = '';
}
