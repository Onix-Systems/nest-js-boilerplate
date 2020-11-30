import { ApiProperty } from '@nestjs/swagger';
import Details from './types/details.type';

export default class UnauthorizedResponse {
  @ApiProperty({ type: String })
  readonly message: string = 'Authentication credentials were missing or incorrect';

  @ApiProperty({ type: Details })
  readonly details: Details | object | null = null;

  constructor(message: string | null = null, details: Details | object | null = null) {
    this.message = message || this.message;

    if (details) {
      this.details = details;
    }
  }
}
