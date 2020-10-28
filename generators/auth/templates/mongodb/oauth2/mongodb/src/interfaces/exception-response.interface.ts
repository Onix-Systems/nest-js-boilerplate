export interface ExceptionResponse {
  readonly message: unknown;

  readonly statusCode: number;

  readonly error: string;
}
