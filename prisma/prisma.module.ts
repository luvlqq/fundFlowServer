import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Global module for all code.
@Module({
  providers: [PrismaService],
})
export class PrismaModule {}
