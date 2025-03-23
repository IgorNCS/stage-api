import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginRequestDTO {
  @IsEmail(undefined, { message: 'Email is invalid' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

