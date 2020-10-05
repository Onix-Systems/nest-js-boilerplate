import { ApiProperty } from '@nestjs/swagger';

export default class ConflictResponse {
  @ApiProperty({ type: String })
  readonly message: string = 'Any message which should help the user to resolve the conflict';

  constructor(message: string | null = null) {
    this.message = message || this.message;
  }
}
