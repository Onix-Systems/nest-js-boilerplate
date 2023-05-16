import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

const DtoFactory = {
  wrap<T>(responseDto: T): Type<unknown> {
    class SuccessResponseDto {
      @ApiProperty({ type: String })
      public message: string = '';

      @ApiProperty({ type: responseDto })
      public data: T | null = null;
    }

    return SuccessResponseDto;
  },
};

const AppUtils = {
  DtoFactory,
};

export default AppUtils;
