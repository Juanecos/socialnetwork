export declare class CreateProfileDto {
    name: string;
    gender: string;
    age: number;
}
export declare class RegisterDto {
    email: string;
    password: string;
    profile: CreateProfileDto;
}
