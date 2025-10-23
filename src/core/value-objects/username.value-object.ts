export class Username {
  private readonly value: string;

  constructor(value: string) {
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
      throw new Error(
        'Invalid username: must be 3–20 chars, alphanumeric or underscore.',
      );
    }
    this.value = value.toLowerCase();
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Username): boolean {
    return this.value === other.getValue();
  }
}
