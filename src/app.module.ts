import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import AuthController from './interfaces/rest/AuthController';
import UserRepositoryImpl from './infrastructure/database/prisma/UserRepositoryImpl';
import UserServiceImpl from './application/services/UserServiceImpl';
import { USER_REPOSITORY } from './application/ports/UserRepository';
import { USER_SERVICE } from './application/ports/UserService';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    PrismaService,
    { provide: USER_REPOSITORY, useClass: UserRepositoryImpl },
    { provide: USER_SERVICE, useClass: UserServiceImpl },
  ],
})
export class AppModule {}
