import { RegisterUserResponseDto } from '../dto/register-user-request.dto';
import { IUserRepository } from '../ports/output/IUserRepository';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(
    request: RegisterUserResponseDto,
  ): Promise<RegisterUserResponseDto | null> {
    return null;
  }
}
