import { Email } from '../value-objects/email.value-object';
import { Username } from '../value-objects/username.value-object';

export class User {
  private id?: string;
  private readonly email: Email;
  private username: Username;
  private password: string;
  private roles: string;
  private avatarUrl?: string;
  private isVerified: boolean;
  private twoFactorEnabled: boolean;
  private isDeleted: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(
    email: Email,
    username: Username,
    password: string,
    roles: string = 'user',
    avatarUrl?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    isVerified = false,
    twoFactorEnabled = false,
    isDeleted = false,
  ) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.roles = roles;
    this.avatarUrl = avatarUrl;
    this.id = id;
    this.isVerified = isVerified;
    this.twoFactorEnabled = twoFactorEnabled;
    this.isDeleted = isDeleted;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  getId(): string | undefined {
    return this.id;
  }

  getEmail(): Email {
    return this.email;
  }

  getUsername(): Username {
    return this.username;
  }

  getRoles(): string {
    return this.roles;
  }

  isUserVerified(): boolean {
    return this.isVerified;
  }
  verifyEmail(): void {
    if (!this.isVerified) {
      this.isVerified = true;
      this.touch();
    }
  }

  enableTwoFactor(): void {
    this.twoFactorEnabled = true;
    this.touch();
  }

  disableTwoFactor(): void {
    this.twoFactorEnabled = false;
    this.touch();
  }

  markDeleted(): void {
    this.isDeleted = true;
    this.touch();
  }

  changePassword(newPassword: string): void {
    this.password = newPassword;
    this.touch();
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
