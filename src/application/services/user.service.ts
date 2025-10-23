import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { RegisterUserResponseDto } from '../dto/register-user-response.dto';
import { IUserRepositoryToken, type IUserRepository } from '../ports/right/IUserRepository';
import { User } from 'src/core/entities/user.entity';
import { RegisterUserDto } from '../dto/register-user-request.dto';

@Injectable()
export class UserService {
    constructor(@Inject(IUserRepositoryToken) private readonly userRepository: IUserRepository) { }

    async execute(
        request: RegisterUserDto,
    ): Promise<RegisterUserResponseDto> {
        const existingUser = await this.userRepository.findByEmail(request.email);
        if (existingUser) {
            throw new ConflictException(
                `User with email ${request.email} already exists`,
            );
        }

        const user: User = request.toEntity();

        const savedUser = await this.userRepository.save(user);

        return RegisterUserResponseDto.fromEntity(savedUser);
    }
}
