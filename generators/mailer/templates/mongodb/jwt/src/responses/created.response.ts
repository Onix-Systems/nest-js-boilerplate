import { ApiProperty } from '@nestjs/swagger';

export default class CreatedResponse {
  @ApiProperty({ type: String })
  readonly message: string = 'The item was created successfully';

  constructor(message: string | null = null) {
    this.message = message || this.message;
  }
}
