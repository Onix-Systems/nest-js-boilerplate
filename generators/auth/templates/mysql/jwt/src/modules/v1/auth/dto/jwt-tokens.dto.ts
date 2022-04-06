import { ApiProperty } from '@nestjs/swagger';

export default class JwtTokensDto {
  @ApiProperty({
    type: String,
  })
  readonly accessToken: string = '';

  @ApiProperty({
    type: String,
  })
  readonly refreshToken: string = '';
}
