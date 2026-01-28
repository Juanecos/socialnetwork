import { Module } from '@nestjs/common';
import { HashService } from './hash/hash.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [HashService, PrismaService],
	exports:  [HashService, PrismaService]
})
export class CommonModule {}
