import { Module, Global } from '@nestjs/common';
import { Cacheable } from 'cacheable';
import { createKeyv } from '@keyv/redis';
require('dotenv').config();

@Module({
  providers: [
    {
      provide: 'CACHE_INSTANCE',
      useFactory: () => {
				const redisurl = process.env.REDIS_URL || 'redis://localhost:6379'
        const secondary = createKeyv(redisurl, {
          namespace: 'keyv',
        });
        return new Cacheable({ secondary, ttl: '4h' });
      },
    },
  ],
  exports: ['CACHE_INSTANCE'],
})
export class CacheModule {}
