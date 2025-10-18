import { Injectable } from '@nestjs/common';
import { type IUserRepository } from '../ports/UserRepository';

@Injectable()
export default class RegisterUserService {
  constructor(private readonly: IUserRepository) {}
}
