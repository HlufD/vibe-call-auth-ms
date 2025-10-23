export class Email {
  private readonly email: string;

  constructor(email: string) {
    if (!Email.isValidEmail(email)) {
      throw new Error('Invalid email format');
    }
    this.email = email;
  }

  getValue(): string {
    return this.email;
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
