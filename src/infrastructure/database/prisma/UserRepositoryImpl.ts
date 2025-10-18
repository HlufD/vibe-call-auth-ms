import { IUserRepository } from 'src/application/ports/UserRepository';
import { IUser } from 'src/domain/entities/User';
import { PrismaService } from './prisma.service';
import { Prisma } from 'generated/prisma';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export default class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<IUser | null> {
    try {
      return (await this.prisma.user.findUnique({ where: { id } })) as IUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(user: IUser): Promise<IUser> {
    try {
      return (await this.prisma.user.create({ data: user })) as IUser;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const field = error.meta?.target?.[0] || 'field';
        throw new ConflictException(`User ith this ${field} already exists.`);
      }

      throw new InternalServerErrorException('Failed to create user.');
    }
  }

  async update(id: string, user: Partial<IUser>): Promise<IUser> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: user,
      });
      return updatedUser as IUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const field = error.meta?.target?.[0] || 'field';
          throw new ConflictException(
            `User with this ${field} already exists.`,
          );
        }

        if (error.code === 'P2025') {
          throw new NotFoundException(`User with id ${id} not found.`);
        }
      }

      throw new InternalServerErrorException('Failed to update user.');
    }
  }
}
