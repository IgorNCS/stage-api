import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginResponsetDTO {
  @IsNotEmpty()
  acces_token: string;
}
