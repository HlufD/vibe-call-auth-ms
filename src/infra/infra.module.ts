import { Module } from '@nestjs/common';
import { PrismaService } from './right/db/prisma/Prisma-Service';
import { AuthController } from './left/http/auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [PrismaService],
})
export class InfraModule {}
