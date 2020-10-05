import { ApiProperty } from '@nestjs/swagger';

export default class NotFoundResponse {
  @ApiProperty({ type: String })
  readonly message: string = 'The item does not exist';

  constructor(message: string | null = null) {
    this.message = message || this.message;
  }
}
