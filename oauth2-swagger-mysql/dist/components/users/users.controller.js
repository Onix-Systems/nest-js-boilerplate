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
const parseObjectId_pipe_1 = require("../../pipes/parseObjectId.pipe");
const isLogged_guard_1 = require("../../guards/isLogged.guard");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getById(id) {
        const foundUser = await this.usersService.getById(id);
        if (!foundUser) {
            throw new common_1.NotFoundException('The user does not exist');
        }
        return foundUser;
    }
};
__decorate([
    swagger_1.ApiOkResponse({ description: 'Returns a found user' }),
    swagger_1.ApiNotFoundResponse({ description: '404...' }),
    common_1.Get(':id'),
    common_1.UseGuards(isLogged_guard_1.default),
    __param(0, common_1.Param('id', parseObjectId_pipe_1.default)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getById", null);
UsersController = __decorate([
    swagger_1.ApiTags('users'),
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.default])
], UsersController);
exports.default = UsersController;
//# sourceMappingURL=users.controller.js.map