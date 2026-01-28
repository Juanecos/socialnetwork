import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RedisService } from './common/redis/redis.service';
import { PrismaService } from './common/prisma/prisma.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache/cache/cache.module';
import { PublicacionModule } from './publicacion/publicacion.module';
@Module({
  imports: [UsersModule, CommonModule, CacheModule, AuthModule, CacheModule, PublicacionModule],
  controllers: [AppController],
  providers: [AppService, RedisService, PrismaService],
})
export class AppModule {}
