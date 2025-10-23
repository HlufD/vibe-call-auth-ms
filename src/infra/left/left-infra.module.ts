import { Module } from '@nestjs/common';
import { AuthController } from './http/auth.controller';
import { ServiceModule } from 'src/application/services/service.module';
@Module({
  imports: [ServiceModule],
  controllers: [AuthController],
})
export class LeftInfraModule {}
