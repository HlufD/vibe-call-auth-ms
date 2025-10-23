import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { RightInfraModule } from 'src/infra/right/right-infra.module';
import { IUserRepositoryToken } from '../ports/right/IUserRepository';
import { UserRepositoryImpl } from 'src/infra/right/db/prisma/UserRepository';
import { SharedModule } from 'src/shared/shared.module';
import { IHashingServiceToken } from 'src/shared/interfaces/IHashingService';
import { HashingServiceImpl } from 'src/shared/utils/hashing.service';
import { IJwtServiceToken } from 'src/shared/interfaces/IJwtService';
import { JwtServiceImpl } from 'src/shared/utils/jwt.service';

@Module({
  imports: [RightInfraModule, SharedModule],
  providers: [
    UserService,
    {
      provide: IUserRepositoryToken,
      useClass: UserRepositoryImpl,
    },
    {
      provide: IHashingServiceToken,
      useClass: HashingServiceImpl,
    },
    {
      provide: IJwtServiceToken,
      useClass: JwtServiceImpl,
    },
  ],
  exports: [UserService],
})
export class ServiceModule {}
