declare class CreateProfileDto {
    name: string;
    gender: string;
    age: number;
}
export declare class CreateUserDto {
    email: string;
    password: string;
    profile: CreateProfileDto;
}
export {};
