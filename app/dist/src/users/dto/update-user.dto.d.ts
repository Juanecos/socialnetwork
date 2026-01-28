declare class UpdateProfileDto {
    name?: string;
    email?: string;
    gender?: string;
    age?: number;
}
export declare class UpdateUserDto {
    password?: string;
    profile?: UpdateProfileDto;
}
export {};
