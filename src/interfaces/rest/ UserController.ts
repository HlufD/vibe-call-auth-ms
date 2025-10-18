import { Controller, Inject } from '@nestjs/common';
import {
  USER_SERVICE,
  type IUserService,
} from 'src/application/ports/UserService';

@Controller('users')
export default class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}
}
