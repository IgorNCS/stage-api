import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginRequestDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
