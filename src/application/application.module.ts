import { Module } from '@nestjs/common';
import { UserService } from './services/register-user.use-case';

@Module({
  providers: [UserService],
  exports:[UserService]
})
export class ApplicationModule {}
