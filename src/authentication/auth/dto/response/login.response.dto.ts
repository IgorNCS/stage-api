import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from 'src/modules/user/enums/role';

export class LoginResponsetDTO {
  @IsNotEmpty()
  access_token: string;
}
