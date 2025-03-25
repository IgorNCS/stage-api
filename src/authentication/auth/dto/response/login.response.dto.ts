import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from 'src/modules/user/enums/role';

export class LoginResponsetDTO {
  @IsNotEmpty()
  access_token: string;

  user: userLoginResponseDTO;
}

class userLoginResponseDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  role: Role;
}
