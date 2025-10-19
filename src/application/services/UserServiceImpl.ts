import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, type IUserRepository } from '../ports/UserRepository';
import { IUser } from 'src/domain/entities/User';
import { IUserService } from '../ports/UserService';

@Injectable()
export default class UserServiceImpl implements IUserService {
  constructor(@Inject(USER_REPOSITORY) private readonly: IUserRepository) {}

  register(user: IUser): Promise<IUser> {
    console.log("This the controller")
    return new Promise((resolve) => resolve(user));
  }
}
