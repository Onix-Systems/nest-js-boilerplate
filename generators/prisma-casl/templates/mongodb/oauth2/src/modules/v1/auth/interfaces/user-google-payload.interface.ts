import { Tokens } from './google-tokens.interface';

export interface UserGooglePayload extends Tokens {
  readonly email: string | null;

  readonly firstName: string | null;

  readonly lastName: string | null;

  readonly picture: string | null;
}
