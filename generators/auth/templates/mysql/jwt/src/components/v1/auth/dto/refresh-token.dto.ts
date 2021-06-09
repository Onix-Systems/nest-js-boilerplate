import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class RefreshTokenDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @MinLength(32)
  @IsString()
  readonly refreshToken: string = '';
}
