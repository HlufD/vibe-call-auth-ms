import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from 'src/application/dto/register-user-request.dto';
import { UserService } from 'src/application/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly uerService: UserService) {}

  @Post('/')
  async register(@Body() body: RegisterUserDto) {
    return this.uerService.execute(body);
  }
}
