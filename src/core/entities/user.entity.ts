import { Email } from '../value-objects/email.value-object';
import { Username } from '../value-objects/username.value-object';
import { Role } from './role.entity';

export class User {
  private id?: string;
  private readonly email: Email;
  private username: Username;
  private firstName: string;
  private lastName: string;
  private password: string;
  private roles: string[];
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
    roles: string[] = [],
    avatarUrl?: string,
    firstName?: string | null,
    lastName?: string | null,
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
    this.firstName = firstName || '';
    this.lastName = lastName || '';
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

  getRoles(): string[] {
    return this.roles;
  }

  getIsVerified(): boolean {
    return this.isVerified;
  }

  getAvatarUrl(): string | undefined {
    return this.avatarUrl;
  }

  getTwoFactorEnabled(): boolean {
    return this.twoFactorEnabled;
  }

  getIsDeleted(): boolean {
    return this.isDeleted;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  verifyEmail(): void {
    if (!this.isVerified) {
      this.isVerified = true;
      this.update();
    }
  }

  enableTwoFactor(): void {
    this.twoFactorEnabled = true;
    this.update();
  }

  disableTwoFactor(): void {
    this.twoFactorEnabled = false;
    this.update();
  }

  delete(): void {
    this.isDeleted = true;
    this.update();
  }

  changePassword(newPassword: string): void {
    this.password = newPassword;
    this.update();
  }

  private update(): void {
    this.updatedAt = new Date();
  }
}
