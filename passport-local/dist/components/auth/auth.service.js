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
const IAuthValidateUserOutput_interface_1 = require("./interfaces/IAuthValidateUserOutput.interface");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.getVerifiedByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('The item does not exist');
        }
        const passwordCompared = await bcrypt.compare(password, user.password);
        if (passwordCompared) {
            return {
                _id: user._id,
                email: user.email,
                verified: user.verified,
            };
        }
        return null;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.default])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map