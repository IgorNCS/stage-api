import { IsString, IsEmail, IsDate, IsEnum, IsBoolean, IsOptional, Matches, IsNotEmpty } from 'class-validator';
import { Role } from '../../enums/role';

export class CreateUserRequestDTO {
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
  cpf: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsDate()
  birthday: Date;


  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean = true;

  @IsString()
  areaIds?: string[];

  @IsEnum(Role)
  role: Role = Role.EMPLOYEER;

}


// curl -X POST \
//   http://localhost:3000/users \
//   -H 'Content-Type: application/json' \
//   -d '{"cpf":"123.456.789-01","name":"Test User","email":"test@example.com","birthday":"1990-01-01","role":"EMPLOYEER","password":"password123","confirmPassword":"password123"}'

