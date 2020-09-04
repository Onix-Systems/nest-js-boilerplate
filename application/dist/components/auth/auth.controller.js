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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const IAuthLoginOutput_interface_1 = require("./interfaces/IAuthLoginOutput.interface");
const ICreatedResponse_interface_1 = require("../../interfaces/responses/ICreatedResponse.interface");
const IVerbUnauthorized_interface_1 = require("../../interfaces/responses/IVerbUnauthorized.interface");
const local_auth_guard_1 = require("./guards/local-auth.guard");
const auth_service_1 = require("./auth.service");
const users_service_1 = require("../users/users.service");
const user_dto_1 = require("../users/dto/user.dto");
const refreshToken_dto_1 = require("./dto/refreshToken.dto");
let AuthController = class AuthController {
    constructor(authService, jwtService, usersService) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async login(req) {
        return this.authService.login(req.user);
    }
    async register(userDto) {
        await this.usersService.create(userDto);
        return {
            message: 'The item was created successfully',
        };
    }
    async refreshToken(refreshTokenDto) {
        const verifiedUser = this.jwtService.verify(refreshTokenDto.refreshToken);
        const oldRefreshToken = await this.authService.getRefreshTokenByEmail(verifiedUser.email);
        if (!oldRefreshToken || oldRefreshToken !== refreshTokenDto.refreshToken) {
            throw new common_1.UnauthorizedException('Authentication credentials were missing or incorrect');
        }
        const payload = {
            id: verifiedUser.id,
            email: verifiedUser.email,
        };
        const newTokens = await this.authService.login(payload);
        return newTokens;
    }
    async logout(token) {
        const { email } = this.jwtService.verify(token);
        const deletedUserCount = await this.authService.deleteTokenByEmail(email);
        if (deletedUserCount === 0) {
            throw new common_1.NotFoundException('The item does not exist');
        }
        return true;
    }
    async logoutAll() {
        await this.authService.deleteAllTokens();
        return true;
    }
};
__decorate([
    common_1.UseGuards(local_auth_guard_1.default),
    common_1.Post('login'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('register'),
    common_1.HttpCode(201),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    common_1.Post('refreshToken'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refreshToken_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    common_1.Delete('logout/:token'),
    common_1.HttpCode(204),
    __param(0, common_1.Param('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    common_1.Delete('logoutAll'),
    common_1.HttpCode(204),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutAll", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.default,
        jwt_1.JwtService,
        users_service_1.default])
], AuthController);
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map