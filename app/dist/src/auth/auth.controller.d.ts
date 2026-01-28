import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
        acessToken: string;
        refreshToken: string;
    }>;
}
