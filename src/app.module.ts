import { Module } from '@nestjs/common';
import { ServiceModule } from './application/services/service.module';
import { RightInfraModule } from './infra/right/right-infra.module';
import { LeftInfraModule } from './infra/left/left-infra.module';
import { AppController } from './app.controller';

@Module({
  imports: [ServiceModule,RightInfraModule,LeftInfraModule],
  controllers:[AppController]
})
export class AppModule {}
