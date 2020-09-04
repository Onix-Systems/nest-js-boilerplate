import { Strategy } from 'passport-jwt';
import { IJwtStrategyValidate } from '@components/auth/interfaces/IJwtStrategyValidate.interface';
import UserDto from '@components/users/dto/user.dto';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export default class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: UserDto): Promise<IJwtStrategyValidate>;
}
export {};
