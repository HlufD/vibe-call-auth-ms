import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/application/ports/right/IUserRepository';
import { User as DomainUser } from 'src/core/entities/user.entity';
import { Email } from 'src/core/value-objects/email.value-object';
import { Username } from 'src/core/value-objects/username.value-object';
import { PrismaService } from './Prisma-Service';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByEmail(email: string): Promise<DomainUser | null> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        return new DomainUser(
            new Email(user.email),
            new Username(user.username ?? ''),
            user.password,
            user.roles ?? [],
            user.avatar_url ?? undefined,
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
                email: user.getEmail().getEmail(),
                username: user.getUsername().get(),
                password: user['password'],
                roles: user.getRoles(),
                avatar_url: user.getAvatarUrl(),
                is_verified: user.getIsVerified(),
                two_factor_enabled: user.getTwoFactorEnabled(),
                deletedAt: user.getIsDeleted(),
            },
        });

        return new DomainUser(
            new Email(saved.email),
            new Username(saved.username ?? ''),
            saved.password,
            saved.roles ?? [],
            saved.avatar_url ?? undefined,
            saved.id,
            saved.created_at,
            saved.updated_at ?? new Date(),
            saved.is_verified,
            saved.two_factor_enabled,
            saved.deletedAt,
        );
    }
}
