import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token if credentials are valid', async () => {
      const loginDTO = { email: 'test@example.com', password: 'password123' };
      const user = { id: 1, email: 'test@example.com', password: await bcrypt.hash('password123', 10) };

      (userService.findOneByEmail as jest.Mock).mockResolvedValue(user as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(Promise.resolve(true) as never);
      jest.spyOn(jwtService, 'sign').mockReturnValue('accessToken');

      const result = await service.login(loginDTO);

      expect(userService.findOneByEmail).toHaveBeenCalledWith(loginDTO.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDTO.password, user.password);
      expect(jwtService.sign).toHaveBeenCalledWith({ userId: user.id, email: user.email });
      expect(result).toEqual({ accessToken: 'accessToken' });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const loginDTO = { email: 'test@example.com', password: 'wrongPassword' };
      const user = { id: 1, email: 'test@example.com', password: await bcrypt.hash('password123', 10) };

      (userService.findOneByEmail as jest.Mock).mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(Promise.resolve(false) as never);

      await expect(service.login(loginDTO)).rejects.toThrow(UnauthorizedException);
    });
    it('should throw UnauthorizedException if user does not exist', async () => {
      const loginDTO = { email: 'nonexistent@example.com', password: 'password123' };

      (userService.findOneByEmail as jest.Mock).mockResolvedValue(undefined);

      await expect(service.login(loginDTO)).rejects.toThrow(UnauthorizedException);
    });
  });
});
