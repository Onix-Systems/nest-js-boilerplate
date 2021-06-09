import { BadRequestException, ValidationError } from '@nestjs/common';

function transform(errors: ValidationError[]) {
  return errors.map((error) => {
    return {
      detail: `${error.property} validation error`,
      source: { pointer: `data/attributes/${error.property}` },
      meta: Object.values(error.constraints),
    };
  });
}

export default class ValidationExceptions extends BadRequestException {
  constructor(public validationErrors: ValidationError[]) {
    super({ errorType: 'ValidationError', errors: transform(validationErrors) });
  }
}
