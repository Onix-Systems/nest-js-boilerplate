"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let LocalAuthGuard = class LocalAuthGuard extends passport_1.AuthGuard('local') {
    constructor() {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }
    async canActivate(context) {
        const can = await super.canActivate(context);
        if (can) {
            const request = context.switchToHttp().getRequest();
            await super.logIn(request);
        }
        return true;
    }
    static getRequest(context) {
        return context.switchToHttp().getRequest();
    }
};
LocalAuthGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], LocalAuthGuard);
exports.default = LocalAuthGuard;
//# sourceMappingURL=local-auth.guard.js.map