import { Role } from './role.entity';

export class Permission {
  private id: string;
  private name: string;
  private roles: Role[];
  private createdAt: Date;
  private updatedAt?: Date;
  private deletedAt: boolean;

  constructor(
    id: string,
    name: string,
    roles: Role[] = [],
    createdAt: Date = new Date(),
    updatedAt?: Date,
    deletedAt: boolean = false,
  ) {
    this.id = id;
    this.name = name;
    this.roles = roles;
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

  getRoles(): Role[] {
    return this.roles;
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

  addRole(role: Role) {
    this.roles.push(role);
  }

  markDeleted() {
    this.deletedAt = true;
  }
}
