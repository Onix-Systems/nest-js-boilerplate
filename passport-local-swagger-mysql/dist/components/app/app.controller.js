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
const isLogged_guard_1 = require("../../guards/isLogged.guard");
let AppController = class AppController {
    getHome(req, res) {
        return { user: req.user };
    }
};
__decorate([
    swagger_1.ApiCookieAuth(),
    swagger_1.ApiOkResponse({ description: 'Returns the logged user' }),
    swagger_1.ApiUnauthorizedResponse({ status: 401, description: 'Returns the unauthorized error' }),
    common_1.UseGuards(isLogged_guard_1.default),
    common_1.Get('/home'),
    common_1.Render('home'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AppController.prototype, "getHome", null);
AppController = __decorate([
    swagger_1.ApiTags('App'),
    common_1.Controller()
], AppController);
exports.default = AppController;
//# sourceMappingURL=app.controller.js.map