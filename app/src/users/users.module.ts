import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
	exports: [UsersService]
})
export class UsersModule {}
