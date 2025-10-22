import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "src/application/dto/register-user-request.dto";
import { RegisterUserUseCase } from "src/application/use-cases/register-user.use-case";

@Controller("auth")
export class AuthController {
    constructor(private readonly registerUserUseCase:RegisterUserUseCase ){}
   
    @Post("/")
    async register(@Body() body:RegisterUserDto) {
        return this.registerUserUseCase.execute(body)
    }
}