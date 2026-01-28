export declare class HashService {
    private readonly saltRounds;
    hash(password: string): Promise<string>;
    compare(password: string, hashed: string): Promise<boolean>;
}
