import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { UserRepositoryImpl } from './output/db/prisma/UserRepository';
import { PrismaService } from './output/db/prisma/Prisma-Service';
import { IUserRepositoryToken } from 'src/application/ports/output/IUserRepository';
import { AuthController } from './input/http/auth.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [AuthController],
  providers: [
    PrismaService,
    { provide: IUserRepositoryToken, useClass: UserRepositoryImpl },
  ],
})
export class InfraModule {}
