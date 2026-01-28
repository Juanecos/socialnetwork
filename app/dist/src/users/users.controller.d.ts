import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): import("../generated/prisma/models").Prisma__UserClient<{
        profile: {
            name: string;
            gender: string;
            age: number;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date | null;
            userId: number;
        } | null;
    } & {
        email: string;
        password: string;
        id: number;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        profile: {
            name: string;
            gender: string;
            age: number;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date | null;
            userId: number;
        } | null;
    } & {
        email: string;
        password: string;
        id: number;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    })[]>;
    findOne(id: string): import("../generated/prisma/models").Prisma__UserClient<({
        profile: {
            name: string;
            gender: string;
            age: number;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date | null;
            userId: number;
        } | null;
    } & {
        email: string;
        password: string;
        id: number;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): import("../generated/prisma/models").Prisma__UserClient<{
        profile: {
            name: string;
            gender: string;
            age: number;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date | null;
            userId: number;
        } | null;
    } & {
        email: string;
        password: string;
        id: number;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    remove(id: string): Promise<{
        message: string;
        user: {
            email: string;
            password: string;
            id: number;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date | null;
        };
        profile: {
            name: string;
            gender: string;
            age: number;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date | null;
            userId: number;
        } | null;
    }>;
}
