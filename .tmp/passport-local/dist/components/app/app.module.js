"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../users/users.module");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                url: 'mongodb+srv://root:1234@cluster0-ilpdw.mongodb.net/nestjs-test-api',
                autoReconnect: true,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1000,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                entities: ['dist/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            auth_module_1.default,
            users_module_1.default,
        ],
        controllers: [app_controller_1.default],
        providers: [],
    })
], AppModule);
exports.default = AppModule;
//# sourceMappingURL=app.module.js.map