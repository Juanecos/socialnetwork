import { Cacheable } from 'cacheable';
export declare class CacheService {
    private readonly cache;
    constructor(cache: Cacheable);
    set<T>(key: string, value: T, ttl?: number): Promise<void>;
    get<T>(key: string): Promise<T | undefined>;
    del(key: string): Promise<boolean>;
    clear(): Promise<void>;
    exists(key: string): Promise<boolean>;
}
