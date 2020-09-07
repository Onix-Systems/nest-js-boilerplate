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
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const nestjs_redis_1 = require("nestjs-redis");
const constants_1 = require("./constants");
const IAuthLoginInput_interface_1 = require("./interfaces/IAuthLoginInput.interface");
const IAuthValidateUserOutput_interface_1 = require("./interfaces/IAuthValidateUserOutput.interface");
const IAuthLoginOutput_interface_1 = require("./interfaces/IAuthLoginOutput.interface");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, redisService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.redisService = redisService;
        this.redisClient = redisService.getClient();
    }
    async validateUser(email, password) {
        const user = await this.usersService.getVerifiedByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('The item does not exist');
        }
        const passwordCompared = await bcrypt.compare(password, user.password);
        if (passwordCompared) {
            return {
                id: user._id,
                email: user.email,
            };
        }
        return null;
    }
    async login(data) {
        const payload = {
            id: data._id,
            email: data.email,
        };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: constants_1.default.accessTokenExpirationTime,
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: constants_1.default.refreshTokenExpirationTime,
        });
        await this.redisClient.set(payload.email, refreshToken, 'EX', 86400);
        return {
            accessToken,
            refreshToken,
        };
    }
    getRefreshTokenByEmail(email) {
        return this.redisClient.get(email);
    }
    deleteTokenByEmail(email) {
        return this.redisClient.del(email);
    }
    deleteAllTokens() {
        return this.redisClient.flushall();
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.default,
        jwt_1.JwtService,
        nestjs_redis_1.RedisService])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map