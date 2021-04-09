import { BadRequestException, ValidationError } from '@nestjs/common';

type typeValidationError = {
  [key: string]: string[]
}

function transform(errors: ValidationError[]) {
  return errors.reduce((acc: typeValidationError[], error: ValidationError) => {
    if (error.constraints) return { ...acc, [error.property]: Object.values(error.constraints) };
    return acc;
  }, []);
}

export default class ValidationExceptions extends BadRequestException {
  constructor(public validationErrors: ValidationError[]) {
    super({ error: 'ValidationError', message: transform(validationErrors) });
  }
}
