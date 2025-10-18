import { IUser } from 'src/domain/entities/User';

export interface IUserService {
  register(userData: Partial<IUser>): Promise<IUser>;
}

export const USER_SERVICE = 'USER_SERVICE';
