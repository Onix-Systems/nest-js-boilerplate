import { Strategy } from 'passport-local';
import { IAuthValidateUserOutput } from '@components/auth/interfaces/IAuthValidateUserOutput.interface';
import AuthService from '@components/auth/auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export default class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<IAuthValidateUserOutput>;
}
export {};
