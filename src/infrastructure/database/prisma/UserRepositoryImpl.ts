import { IUserRepository } from 'src/application/ports/UserRepository';
import { IUser } from 'src/domain/entities/User';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<IUser | null> {
    return (await this.prisma.user.findUnique({ where: { id } })) as IUser;
  }

  async create(user: IUser): Promise<IUser> {
    return (await this.prisma.user.create({ data: user })) as IUser;
  }

  async update(id: string, user: Partial<IUser>): Promise<IUser> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: user,
    });

    return updatedUser as IUser;
  }
}
