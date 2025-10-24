import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/application/ports/right/IUserRepository';
import { User as DomainUser } from 'src/core/entities/user.entity';
import { Email } from 'src/core/value-objects/email.value-object';
import { Username } from 'src/core/value-objects/username.value-object';
import { PrismaService } from './Prisma-Service';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<DomainUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { roles: true },
    });
    if (!user) return null;

    const roles = user.roles?.map((r) => r.name) ?? [];

    return new DomainUser(
      new Email(user.email),
      new Username(user.username ?? ''),
      user.password,
      roles,
      user.avatar_url ?? undefined,
      user.firstName,
      user.lastName,
      user.id,
      user.created_at,
      user.updated_at ?? new Date(),
      user.is_verified,
      user.two_factor_enabled,
      user.deletedAt,
    );
  }

  async save(user: DomainUser): Promise<DomainUser> {
    const saved = await this.prisma.user.create({
      data: {
        email: user.getEmail().getValue(),
        username: user.getUsername().getValue(),
        firstName:user.getFirstName(),
        lastName:user.getLastName(),
        password: user['password'],
        roles: {
          connect: user.getRoles().map((role) => ({ id: role })),
        },
        avatar_url: user.getAvatarUrl(),
        is_verified: user.getIsVerified(),
        two_factor_enabled: user.getTwoFactorEnabled(),
        deletedAt: user.getIsDeleted(),
      },
      include: {
        roles: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const roles = saved.roles?.map((r) => (r.id, r.name)) ?? [];

    return new DomainUser(
      new Email(saved.email),
      new Username(saved.username ?? ''),
      saved.password,
      roles,
      saved.avatar_url ?? undefined,
      saved.firstName,
      saved.lastName,
      saved.id,
      saved.created_at,
      saved.updated_at ?? new Date(),
      saved.is_verified,
      saved.two_factor_enabled,
      saved.deletedAt,
    );
  }
}
