import { ValidationError } from 'adminjs';
import { ValidationError as ValidationErrorResponse } from 'class-validator';

const fetchError = (errors: ValidationErrorResponse[]) => {
  const [error] = errors;

  const [message] = Object.values(error.constraints as Object);

  return {
    field: error.property,
    message,
  };
};

export default class ValidationException extends ValidationError {
  constructor(public validationErrors: ValidationErrorResponse[]) {
    const { field, message } = fetchError(validationErrors);

    super({
      [field]: {
        message,
      },
    }, {
      message,
    });
  }
}
