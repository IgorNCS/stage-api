import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginRequestDTO } from './dto/request/login.dto';
import { UserService } from 'src/modules/user/user.service';
import { LoginResponsetDTO } from './dto/response/login.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDTO: LoginRequestDTO): Promise<LoginResponsetDTO> {
    try {
      const user = await this.userService.findOneByEmail(loginDTO.email);
      if (!user || !(await bcrypt.compare(loginDTO.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { userId: user.id, email: user.email, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  }

  async logout(oi: any) {
    return true;
  }
}
