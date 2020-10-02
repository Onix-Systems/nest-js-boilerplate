import { ApiProperty } from '@nestjs/swagger';

export default class SignUpDto {
  @ApiProperty({ type: String })
  readonly email: string = '';

  @ApiProperty({ type: String })
  readonly password: string = '';
}
