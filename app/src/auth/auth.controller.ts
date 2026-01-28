import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

	@Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Get('login')
  login(@Query() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  async logout(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid token format');
    }

    const decoded = this.jwtService.decode(token) as any;
    if (!decoded || !decoded.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    return this.authService.logout(decoded.sub, token);
  }
}
