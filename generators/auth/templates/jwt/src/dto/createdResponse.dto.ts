import { ApiProperty } from '@nestjs/swagger';

export default class CreatedResponseDto {
  @ApiProperty({
    type: String,
  })
  readonly message: string;
}
