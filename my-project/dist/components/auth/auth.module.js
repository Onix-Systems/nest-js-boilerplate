"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const local_strategy_1 = require("./strategies/local.strategy");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const constants_1 = require("./constants");
const users_module_1 = require("../users/users.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            users_module_1.default,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.default.secret,
            }),
        ],
        providers: [
            auth_service_1.default,
            local_strategy_1.default,
            jwt_strategy_1.default,
        ],
        controllers: [auth_controller_1.default],
        exports: [auth_service_1.default],
    })
], AuthModule);
exports.default = AuthModule;
//# sourceMappingURL=auth.module.js.map