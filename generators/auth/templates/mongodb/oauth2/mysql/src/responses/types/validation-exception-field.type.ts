import { ApiProperty } from '@nestjs/swagger';

export default class ValidationExceptionField {
  @ApiProperty({ type: [String] })
  readonly messages: string[] = [];

  @ApiProperty({ type: String })
  readonly field: string = '';
}
