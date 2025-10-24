import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { RegisterUserResponseDto } from '../dto/register-user-response.dto';
import {
  IUserRepositoryToken,
  type IUserRepository,
} from '../ports/right/IUserRepository';
import { User } from 'src/core/entities/user.entity';
import { RegisterUserDto } from '../dto/register-user-request.dto';
import {
  IHashingServiceToken,
  type IHashingService,
} from 'src/shared/interfaces/IHashingService';
import {
  type IJwtService,
  IJwtServiceToken,
} from 'src/shared/interfaces/IJwtService';
import {
  type IQueueService,
  IQueueServiceToken,
} from '../ports/right/IQueueService';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,

    @Inject(IHashingServiceToken)
    private readonly hashingService: IHashingService,

    @Inject(IJwtServiceToken) private readonly jwtService: IJwtService,

    @Inject(IQueueServiceToken) private readonly rabitMqService: IQueueService,
  ) {}

  async register(request: RegisterUserDto): Promise<RegisterUserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(request.email);

    if (existingUser) {
      throw new ConflictException(
        `User with email ${request.email} already exists`,
      );
    }

    console.log(request)
    const user: User = request.toEntity();
    console.log(user)

    user.changePassword(await this.hashingService.hash(request.password));

    const savedUser = await this.userRepository.save(user);

    await this.rabitMqService.emit('register_user', {
      id: savedUser.getId(),
      email: savedUser.getEmail().getValue(),
      fullName: savedUser.getFirstName() + savedUser.getLastName(),
    });

    return RegisterUserResponseDto.fromEntity(savedUser);
  }
}
