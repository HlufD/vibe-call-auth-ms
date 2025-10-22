import { User } from 'src/core/entities/user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
}


export const IUserRepositoryToken = Symbol('IUserRepository');