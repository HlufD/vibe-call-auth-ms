import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, type IUserRepository } from '../ports/UserRepository';
import { IUser } from 'src/domain/entities/User';
import { IUserService } from '../ports/UserService';

@Injectable()
export default class UserServiceImpl implements IUserService {
  constructor(@Inject(USER_REPOSITORY) private readonly: IUserRepository) {}

  register(userData: Partial<IUser>): Promise<IUser> {
    console.log(userData);
    throw new Error('Method not implemented.');
  }
}
