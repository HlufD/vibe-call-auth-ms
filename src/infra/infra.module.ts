import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { UserRepositoryImpl } from './right/db/prisma/UserRepository';
import { PrismaService } from './right/db/prisma/Prisma-Service';
import { IUserRepositoryToken } from 'src/application/ports/right/IUserRepository';
import { AuthController } from './left/http/auth.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [AuthController],
  providers: [
    PrismaService,
    { provide: IUserRepositoryToken, useClass: UserRepositoryImpl },
  ],
})
export class InfraModule {}
