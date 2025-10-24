import { User } from 'src/core/entities/user.entity';

export class RegisterUserResponseDto {
  id?: string;
  email: string;
  username: string;
  roles: string[];
  avatarUrl?: string;
  isVerified: boolean;
  twoFactorEnabled: boolean;
  token: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: {
    id?: string;
    email: string;
    username: string;
    roles: string[];
    avatarUrl?: string;
    isVerified: boolean;
    twoFactorEnabled: boolean;
    token: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.email = props.email;
    this.username = props.username;
    this.roles = props.roles;
    this.avatarUrl = props.avatarUrl;
    this.isVerified = props.isVerified;
    this.twoFactorEnabled = props.twoFactorEnabled;
    this.token = props.token;
    this.isDeleted = props.isDeleted;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static fromEntity(user: User, token): RegisterUserResponseDto {
    return new RegisterUserResponseDto({
      id: user.getId(),
      email: user.getEmail().getValue(),
      username: user.getUsername().getValue(),
      roles: user.getRoles(),
      avatarUrl: user.getAvatarUrl(),
      isVerified: user.getIsVerified(),
      twoFactorEnabled: user.getTwoFactorEnabled(),
      token,
      isDeleted: user.getIsDeleted(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    });
  }
}
