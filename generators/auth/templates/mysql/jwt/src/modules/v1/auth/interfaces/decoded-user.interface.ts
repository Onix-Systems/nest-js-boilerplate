export interface DecodedUser {
  readonly id: number;

  readonly email: string;

  readonly password: string;

  readonly role: string;

  readonly iat?: number;

  readonly exp?: number;
}
