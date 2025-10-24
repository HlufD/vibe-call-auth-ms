import { Module } from '@nestjs/common';
import { PrismaService } from './db/prisma/Prisma-Service';
import { UserRepositoryImpl } from './db/prisma/UserRepository';
import { RabbitMqQueueServiceImpl } from './queue/rabbitmq-queue.service';

@Module({
  providers: [PrismaService, UserRepositoryImpl, RabbitMqQueueServiceImpl],
  exports: [PrismaService, UserRepositoryImpl, RabbitMqQueueServiceImpl],
})
export class RightInfraModule {}
