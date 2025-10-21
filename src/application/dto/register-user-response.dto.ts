import { Email } from 'src/core/value-objects/email.value-object';
import { Username } from 'src/core/value-objects/username.value-object';

export class RegisterUserResponseDto {
  id?: string;
  email: string;
  username: string;
  password: string;
  roles: string;
  avatarUrl?: string;
  isVerified: boolean;
  twoFactorEnabled: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: {
    id?: string;
    email: Email;
    username: Username;
    password: string;
    roles: string;
    avatarUrl?: string;
    isVerified: boolean;
    twoFactorEnabled: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = user.id;
    this.email = user.email.getEmail();
    this.username = user.username.get();
    this.password = user.password;
    this.roles = user.roles;
    this.avatarUrl = user.avatarUrl;
    this.isVerified = user.isVerified;
    this.twoFactorEnabled = user.twoFactorEnabled;
    this.isDeleted = user.isDeleted;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
