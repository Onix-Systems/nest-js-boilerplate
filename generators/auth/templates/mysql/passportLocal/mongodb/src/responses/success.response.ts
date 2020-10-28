import { ApiProperty } from '@nestjs/swagger';
import Data from './types/data.type';

export default class SuccessResponse {
  @ApiProperty({ type: Data })
  readonly data: Data | object | null = null;

  constructor(message: string | null = null, data: Data | object | null = null) {
    if (data) {
      this.data = data;
    }
  }
}
