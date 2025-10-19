import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('Authentication ms')
    .setDescription('This is authentication micro service for vibe call app')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(PORT, () => {
    console.log('server is running on port', PORT);
  });
}
bootstrap();
