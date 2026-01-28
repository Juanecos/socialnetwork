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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const hash_service_1 = require("../common/hash/hash.service");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const cache_service_1 = require("../cache/cache/cache.service");
let AuthService = class AuthService {
    hashService;
    usersService;
    jwtService;
    redisService;
    constructor(hashService, usersService, jwtService, redisService) {
        this.hashService = hashService;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.redisService = redisService;
    }
    getExistingProfileException(existingProfile) {
        return existingProfile.is_active && !existingProfile.deleted_at
            ? 'El usuario ya se encuentra registrado con ese email.'
            : 'El usuario está inactivo o eliminado.';
    }
    async register(dto) {
        const existingProfile = await this.usersService.findUserByEmail(dto.email);
        if (existingProfile) {
            throw new common_1.BadRequestException(this.getExistingProfileException(existingProfile));
        }
        const hashedPassword = await this.hashService.hash(dto.password);
        const user = await this.usersService.create({
            email: dto.email,
            password: hashedPassword,
            profile: dto.profile,
        });
        const fullUser = await this.usersService.findOne(user.id);
        if (!fullUser) {
            throw new Error('Unexpected: user not found after creation');
        }
        const token = this.generateToken({
            sub: fullUser.id,
            email: dto.email,
        });
        return {
            message: 'Usuario registrado correctamente',
            user: fullUser,
            token,
        };
    }
    async login(dto) {
        if (!dto.email || dto.email.trim() === '') {
            throw new common_1.BadRequestException('El email es requerido');
        }
        if (!dto.password || dto.password.trim() === '') {
            throw new common_1.BadRequestException('La contraseña es requerida');
        }
        const user = await this.validateUser(dto.email, dto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas.');
        }
        const refreshTime = 7 * 24 * 60;
        const tokenTime = 15;
        const accessToken = this.generateToken({
            sub: user.id,
            email: user.email,
            expiresIn: `${tokenTime}m`,
        });
        const refreshToken = this.generateToken({
            sub: user.id,
            email: user.email,
            expiresIn: `${refreshTime}m`,
        });
        await this.redisService.set(`refresh:${user.id}`, refreshToken, refreshTime * 60);
        await this.redisService.set(`access:${user.id}`, accessToken, tokenTime * 60);
        return {
            message: 'Login exitoso',
            user: user,
            acessToken: accessToken,
            refreshToken: refreshToken,
        };
    }
    async validateUser(email, password) {
        console.log(email);
        console.log(password);
        const user = await this.usersService.findUserByEmail(email);
        if (!user) {
            return null;
        }
        if (!user.is_active || user.deleted_at) {
            return null;
        }
        const passwordValid = await this.hashService.compare(password, user.password);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        return user;
    }
    async refresh(userId, email, refreshToken) {
        const stored = await this.redisService.get(`refresh:${userId}`);
        if (!stored || stored !== refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token inválido');
        }
        const newAccessToken = this.generateToken({
            sub: userId,
            email: email,
            expiresIn: '15m',
        });
        return { accessToken: newAccessToken };
    }
    async logout(userId, accessToken) {
        const decoded = this.jwtService.decode(accessToken);
        const ttl = decoded.exp - Math.floor(Date.now() / 1000);
        await this.redisService.set(`bl:${accessToken}`, true, ttl);
        await this.redisService.del(`refresh:${userId}`);
    }
    generateToken(payload, expiresIn = 3600) {
        return this.jwtService.sign(payload, { expiresIn });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hash_service_1.HashService,
        users_service_1.UsersService,
        jwt_1.JwtService,
        cache_service_1.CacheService])
], AuthService);
//# sourceMappingURL=auth.service.js.map