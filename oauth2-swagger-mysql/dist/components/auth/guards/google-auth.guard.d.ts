import { ExecutionContext } from '@nestjs/common';
declare const GoogleAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export default class GoogleAuthGuard extends GoogleAuthGuard_base {
    canActivate(context: ExecutionContext): Promise<boolean | never>;
    static getRequest(context: ExecutionContext): any;
}
export {};
