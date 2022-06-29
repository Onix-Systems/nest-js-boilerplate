export interface ExceptionResponse {
  readonly statusCode: number;

  readonly error: string;

  readonly message: unknown;

  readonly messages: unknown[];
}
