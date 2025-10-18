import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import AuthController from './interfaces/rest/AuthController';
import UserController from './interfaces/rest/ UserController';

@Module({
  imports: [],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
