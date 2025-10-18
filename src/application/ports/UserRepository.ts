import { IUser } from 'src/domain/entities/User';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserRepository {
  register(body: RegisterUserDto): Promise<IUser>;
  updateUser(body: UpdateUserDto): Promise<IUser>;
}
