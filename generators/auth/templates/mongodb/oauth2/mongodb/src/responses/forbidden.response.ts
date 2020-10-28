import { ApiProperty } from '@nestjs/swagger';
import Details from './types/details.type';

export default class ForbiddenResponse {
  @ApiProperty({ type: String })
  readonly message: string = 'The request is understood, but it has been refused or access is not allowed';

  @ApiProperty({ type: Details })
  readonly details: Details | object | null = null;

  constructor(message: string | null = null, details: Details | object | null = null) {
    this.message = message || this.message;

    if (details) {
      this.details = details;
    }
  }
}
