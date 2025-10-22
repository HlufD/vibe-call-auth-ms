import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from './use-cases/register-user.use-case';
import { IUserRepositoryToken } from './ports/right/IUserRepository';

@Module({
  providers: [
    RegisterUserUseCase,
    {
      provide: IUserRepositoryToken,
      useValue: {}, // just a placeholder; actual implementation comes from InfraModule
    },
  ],
  exports: [RegisterUserUseCase, IUserRepositoryToken],
})
export class ApplicationModule {}
