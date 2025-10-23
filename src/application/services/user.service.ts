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

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,

    @Inject(IHashingServiceToken)
    private readonly hashingService: IHashingService,

    @Inject(IJwtServiceToken) private readonly jwtService: IJwtService,
  ) {}

  async register(request: RegisterUserDto): Promise<RegisterUserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(request.email);

    if (existingUser) {
      throw new ConflictException(
        `User with email ${request.email} already exists`,
      );
    }

    const user: User = request.toEntity();

    user.changePassword(await this.hashingService.hash(request.password));

    const savedUser = await this.userRepository.save(user);

    const token = await this.jwtService.sign({
      id: savedUser.getId(),
      username: savedUser.getUsername().getValue(),
      email:savedUser.getEmail().getValue(),
      roles:savedUser.getRoles(),
    },{expiresIn:"1h",secret:process.env.JWT_SECRET});

    return RegisterUserResponseDto.fromEntity(savedUser,token);
  }
}
