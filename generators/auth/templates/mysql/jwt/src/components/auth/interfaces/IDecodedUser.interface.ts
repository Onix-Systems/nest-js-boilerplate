export interface IDecodedUser {
  readonly id: number;

  readonly email: string;

  readonly password: string;

  readonly verified: boolean;
  
  readonly iat: number;

  readonly exp: number;
}
