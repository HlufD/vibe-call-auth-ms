import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { RightInfraModule } from 'src/infra/right/right-infra.module';
import { IUserRepositoryToken } from '../ports/right/IUserRepository';
import { UserRepositoryImpl } from 'src/infra/right/db/prisma/UserRepository';

@Module({
  imports:[RightInfraModule],
  providers: [UserService,{
    provide:IUserRepositoryToken,useClass:UserRepositoryImpl
  }],
  exports:[UserService]
})
export class ServiceModule {}
