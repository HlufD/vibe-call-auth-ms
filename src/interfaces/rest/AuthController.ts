import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterUserDto } from 'src/application/dto/register-user.dto';
import {
  type IUserService,
  USER_SERVICE,
} from 'src/application/ports/UserService';

@Controller('auth')
export default class AuthController {
  constructor(
    @Inject(USER_SERVICE) private readonly authService: IUserService,
  ) {}

  @Post('/sign-up')
  async register(@Body() user: RegisterUserDto) {
    return await this.authService.register(user);
  }

  async login() {}

  async logout() {}

  async refresh() {}
}
