import { Injectable, OnModuleInit } from '@nestjs/common';
import { IQueueService } from 'src/application/ports/right/IQueueService';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RabbitMqQueueServiceImpl implements IQueueService, OnModuleInit {
  private client: ClientProxy;

  async onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
        ],
        queue: 'vibe-call-queue',
        queueOptions: { durable: true },
      },
    });

    try {
      await this.client.connect();
      console.log('Connected to RabbitMQ successfully');
    } catch (err) {
      console.error('Failed to connect to RabbitMQ', err);
    }
  }

  emit(pattern: string, data: any) {
   console.debug(`📤 Emitting event "${pattern}" with data: ${JSON.stringify(data)}`);
    this.client.emit(pattern, data);
  }
}
