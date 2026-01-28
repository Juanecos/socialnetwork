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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findUserByEmail(email) {
        return this.prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                profile: true,
            },
        });
    }
    create(createUserDto) {
        const { profile, ...userData } = createUserDto;
        return this.prisma.user.create({
            data: {
                ...userData,
                profile: {
                    create: {
                        ...profile,
                    },
                },
            },
            include: {
                profile: true,
            },
        });
    }
    findAll() {
        return this.prisma.user.findMany({
            where: { deleted_at: null },
            include: { profile: true },
        });
    }
    findOne(id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                profile: true,
            },
        });
    }
    update(id, updateUserDto) {
        const { profile, ...userData } = updateUserDto;
        return this.prisma.user.update({
            where: { id },
            data: {
                ...userData,
                profile: profile
                    ? {
                        update: {
                            ...profile,
                        },
                    }
                    : undefined,
            },
            include: { profile: true },
        });
    }
    async remove(id) {
        const deleted_user = await this.prisma.user.update({
            where: { id },
            data: {
                deleted_at: new Date(),
                is_active: false,
            },
        });
        await this.prisma.profile.updateMany({
            where: { userId: id },
            data: {
                deleted_at: new Date(),
                is_active: false,
            },
        });
        const deleted_profile = await this.prisma.profile.findUnique({
            where: {
                userId: id,
            },
        });
        return {
            message: 'Usuario y perfil eliminados correctamente',
            user: deleted_user,
            profile: deleted_profile,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map