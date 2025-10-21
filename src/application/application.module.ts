import { Module } from "@nestjs/common";
import { RegisterUserUseCase } from "./use-cases/register-user.use-case";
import { UserRepositoryImpl } from "src/infra/output/db/prisma/UserRepository";
import { IUserRepositoryToken } from "./ports/output/IUserRepository"

@Module({
    providers: [
        RegisterUserUseCase,
        { provide: IUserRepositoryToken, useClass: UserRepositoryImpl },
    ],
    exports: [RegisterUserUseCase],
})
export class ApplicationModule { }
