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
const ICreatedResponse_interface_1 = require("../../interfaces/responses/ICreatedResponse.interface");
const local_auth_guard_1 = require("./guards/local-auth.guard");
const auth_service_1 = require("./auth.service");
const users_service_1 = require("../users/users.service");
const user_dto_1 = require("../users/dto/user.dto");
const isLogged_guard_1 = require("../../guards/isLogged.guard");
const isNotLogged_guard_1 = require("../../guards/isNotLogged.guard");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async login(req) {
        return {
            message: 'Logged is successfully',
        };
    }
    async register(userDto) {
        await this.usersService.create(userDto);
        return {
            message: 'The item was created successfully',
        };
    }
    async logout(req) {
        await req.logout();
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
    common_1.UseGuards(isNotLogged_guard_1.default),
    common_1.Post('register'),
    common_1.HttpCode(201),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    common_1.UseGuards(isLogged_guard_1.default),
    common_1.Delete('logout'),
    common_1.HttpCode(204),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.default,
        users_service_1.default])
], AuthController);
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map