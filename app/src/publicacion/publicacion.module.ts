import { Module } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { PublicacionController } from './publicacion.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { CacheModule } from 'src/cache/cache/cache.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UsersModule, CommonModule, CacheModule, AuthModule],
  controllers: [PublicacionController],
  providers: [PublicacionService, PrismaService],
})
export class PublicacionModule {}
