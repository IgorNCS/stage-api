import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDTO } from './dto/request/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() loginDTO: LoginRequestDTO) {
    try {
      return this.authService.login(loginDTO);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Res() res: Response) {
    return res
      .clearCookie('access_token')
      .status(HttpStatus.OK)
      .json({ access_token: null, status: HttpStatus.OK });
  }
}
