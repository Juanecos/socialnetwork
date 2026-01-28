import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommonModule } from 'src/common/common.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { HashService } from 'src/common/hash/hash.service';
import { UsersModule } from 'src/users/users.module';
import { CacheModule } from 'src/cache/cache/cache.module';
import { CacheService } from 'src/cache/cache/cache.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    UsersModule,
    CommonModule,
    CacheModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey123',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    HashService,
    CacheService,
    UsersService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
