import { Permission } from './permission.entity';
import { User } from './user.entity';

export class Role {
  private id: string;
  private name: string;
  private users: User[];
  private permissions: Permission[];
  private createdAt: Date;
  private updatedAt?: Date;
  private deletedAt: boolean;

  constructor(
    id: string,
    name: string,
    users: User[] = [],
    permissions: Permission[] = [],
    createdAt: Date = new Date(),
    updatedAt?: Date,
    deletedAt: boolean = false,
  ) {
    this.id = id;
    this.name = name;
    this.users = users;
    this.permissions = permissions;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getUsers(): User[] {
    return this.users;
  }

  getPermissions(): Permission[] {
    return this.permissions;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  isDeleted(): boolean {
    return this.deletedAt;
  }

  // Setters / actions
  addUser(user: User) {
    this.users.push(user);
  }

  addPermission(permission: Permission) {
    this.permissions.push(permission);
  }

  markDeleted() {
    this.deletedAt = true;
  }
}
