import { ExecutionContext } from '@nestjs/common';
declare const LocalAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export default class LocalAuthGuard extends LocalAuthGuard_base {
    constructor();
    canActivate(context: ExecutionContext): Promise<boolean | never>;
    static getRequest(context: ExecutionContext): any;
}
export {};
