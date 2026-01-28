import { HashService } from 'src/common/hash/hash.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/cache/cache/cache.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly hashService;
    private readonly usersService;
    private readonly jwtService;
    private readonly redisService;
    constructor(hashService: HashService, usersService: UsersService, jwtService: JwtService, redisService: CacheService);
    private getExistingProfileException;
    register(dto: RegisterDto): Promise<{
        message: string;
        user: {
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
        };
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        message: string;
        user: {
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
        };
        accessToken: string;
        refreshToken: string;
    }>;
    validateUser(email: string, password: string): Promise<({
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
    }) | null>;
    refresh(userId: number, email: string, refreshToken: string): Promise<{
        accessToken: string;
    }>;
    logout(userId: number, accessToken: string): Promise<void>;
    generateToken(payload: any, expiresIn?: number): string;
}
