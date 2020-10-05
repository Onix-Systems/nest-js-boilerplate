export interface ValidateUserOutput {
  readonly id: number;

  readonly email?: string;

  readonly verified: boolean;
}
