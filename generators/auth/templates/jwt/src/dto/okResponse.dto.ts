import { ApiProperty } from '@nestjs/swagger';

export default class OkResponseDto {
  @ApiProperty({ type: String })
  readonly message: string;
}
