import { ValidationError } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import Details from './types/details.type';
import ValidationExceptionField from './types/validation-exception-field.type';

export default class BadRequestResponse {
  @ApiProperty({ type: String })
  readonly message: string = 'Validation errors in your request';

  @ApiProperty({ type: [ValidationExceptionField] })
  readonly errors: ValidationExceptionField[] | string[] | null = null;

  @ApiProperty({ type: Details })
  readonly details: Details | object | null = null;

  constructor(
    message: string | null = null,
    errors: unknown[] = [],
    details: Details | object | null = null,
  ) {
    this.message = message || this.message;
    this.errors = this.getCorrectArrayOfErrors(errors);

    if (details) {
      this.details = details;
    }
  }

  private getCorrectArrayOfErrors(errors: unknown[]): ValidationExceptionField[] | string[] {
    const thisIsAStringArray = typeof errors[0] === 'string';

    if (thisIsAStringArray) {
      return errors as string[];
    }

    const editedErrors = errors as ValidationError[];

    return editedErrors.map((error: ValidationError) => ({
      messages: Object.values(error.constraints),
      field: error.property,
    }));
  }
}
