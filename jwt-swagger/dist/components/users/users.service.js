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
const bcrypt = require("bcrypt");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const mongodb_1 = require("mongodb");
const user_entity_1 = require("./entities/user.entity");
const user_dto_1 = require("./dto/user.dto");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(userDto) {
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        return this.usersRepository.save({
            password: hashedPassword,
            email: userDto.email,
            verified: false,
        });
    }
    getVerifiedByEmail(email) {
        return this.usersRepository.findOne({
            email,
            verified: true,
        });
    }
    getById(id, verified = true) {
        return this.usersRepository.findOne({
            _id: new mongodb_1.ObjectID(id),
            verified,
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
exports.default = UsersService;
//# sourceMappingURL=users.service.js.map