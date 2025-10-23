import { Module } from '@nestjs/common';
import { PrismaService } from './db/prisma/Prisma-Service';
import { UserRepositoryImpl } from './db/prisma/UserRepository';

@Module({
  providers: [PrismaService,UserRepositoryImpl],
  exports:[PrismaService,UserRepositoryImpl]
})
export class RightInfraModule {}