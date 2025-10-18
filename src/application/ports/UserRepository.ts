import { IUser } from 'src/domain/entities/User';

export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  create(user: IUser): Promise<IUser>;
  update(id: string, user: Partial<IUser>): Promise<IUser>;
}

export const USER_REPOSITORY = 'USER_REPOSITORY';
