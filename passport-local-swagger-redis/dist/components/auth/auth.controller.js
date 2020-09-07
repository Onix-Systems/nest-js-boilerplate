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
const swagger_1 = require("@nestjs/swagger");
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
    index(req, res) {
        return { message: req.flash('loginError') };
    }
    async signup(req, res) { }
    async create(params, req, res) {
        await this.usersService.create(params);
        res.redirect('/');
    }
    logout(req, res) {
        req.logout();
        res.redirect('/');
    }
    login(req, res) {
        res.redirect('/home');
    }
};
__decorate([
    swagger_1.ApiOkResponse({ description: 'Renders a login page' }),
    swagger_1.ApiUnauthorizedResponse({ description: 'Returns an unauthorized ' }),
    common_1.Get('/login'),
    common_1.Render('login'),
    __param(0, common_1.Request()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "index", null);
__decorate([
    swagger_1.ApiOkResponse({ description: 'Redners a sign up page' }),
    swagger_1.ApiUnauthorizedResponse({ description: 'Returns the unauthorized error' }),
    common_1.Get('/sign-up'),
    common_1.Render('signup'),
    __param(0, common_1.Request()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    swagger_1.ApiOkResponse({ description: 'Creates a user' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Returns the 500 error' }),
    common_1.Post('/register'),
    common_1.Render('create'),
    __param(0, common_1.Body()), __param(1, common_1.Request()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    swagger_1.ApiOkResponse({ description: 'If logout is success' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Internal error' }),
    common_1.Get('/logout'),
    __param(0, common_1.Request()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    swagger_1.ApiCookieAuth(),
    swagger_1.ApiOkResponse({ description: 'Returns 200 if login is ok' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Returns 500 if smth has been failed' }),
    common_1.UseGuards(local_auth_guard_1.default),
    common_1.Post('/login'),
    __param(0, common_1.Request()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    swagger_1.ApiTags('Auth'),
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.default,
        users_service_1.default])
], AuthController);
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map