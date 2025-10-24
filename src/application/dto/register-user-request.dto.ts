import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Email } from 'src/core/value-objects/email.value-object';
import { Username } from 'src/core/value-objects/username.value-object';
import { User } from 'src/core/entities/user.entity';
import { Optional } from '@nestjs/common';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @Optional()
  @IsNotEmpty()
  firstName: string;

  @Optional()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString({ each: true })
  roles?: string[];

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  toEntity(): User {
    const emailVO = new Email(this.email);
    const usernameVO = new Username(this.username);
    return new User(
      emailVO,
      usernameVO,
      this.password,
      this.roles ?? [],
      this.avatarUrl,
      this.firstName,
      this.lastName,
    );
  }
}
