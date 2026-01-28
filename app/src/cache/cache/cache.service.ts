import { Injectable, Inject } from '@nestjs/common';
import { Cacheable } from 'cacheable';

import Keyv from 'keyv';

@Injectable()
export class CacheService {
  constructor(@Inject('CACHE_INSTANCE') private readonly cache: Cacheable){}

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cache.set(key, value, ttl);
  }

  async get<T>(key: string): Promise<T | undefined> {
  const value = await this.cache.get(key);
  
  if (value === undefined) {
    console.log(`Cache miss for key: ${key}`);
    return undefined;
  } else {
    console.log(`Cache hit for key: ${key}`);
    return value as T;
  }
}

  async del(key: string): Promise<boolean> {
    const deleted = await this.cache.delete(key);
    if (deleted) {
      console.log(`Cache key "${key}" deleted.`);
    } else {
      console.log(`Cache key "${key}" not found.`);
    }
    return deleted;
  }

  async clear(): Promise<void> {
    await this.cache.clear();
    console.log('Cache cleared');
  }

	async exists(key: string): Promise<boolean> {
    const exists = await this.cache.has(key);
    console.log(`Cache exists for key "${key}": ${exists}`);
    return exists;
  }
}
