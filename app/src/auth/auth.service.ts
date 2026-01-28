import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { HashService } from 'src/common/hash/hash.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/cache/cache/cache.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redisService: CacheService,
  ) {}
  private getExistingProfileException(existingProfile: any): string {
    return existingProfile.is_active && !existingProfile.deleted_at
      ? 'El usuario ya se encuentra registrado con ese email.'
      : 'El usuario está inactivo o eliminado.';
  }

  async register(dto: RegisterDto) {
    //** 1. Obtener usuarios con perfil ya existente
    const existingProfile = await this.usersService.findUserByEmail(dto.email);
    if (existingProfile) {
      throw new BadRequestException(
        this.getExistingProfileException(existingProfile),
      );
    }
    //** 2. Crear el usuario con la contraseña hasheada
    const hashedPassword = await this.hashService.hash(dto.password);
    const user = await this.usersService.create({
      email: dto.email,
      password: hashedPassword,
      profile: dto.profile,
    });

    //** 3. Validar creacion y obtener el usuario
    const fullUser = await this.usersService.findOne(user.id);
    if (!fullUser) {
      throw new Error('Unexpected: user not found after creation');
    }
    //** 4. Generar token de autenticacion jwt
    const token = this.generateToken({
      sub: fullUser.id,
      email: dto.email,
    });

    return {
      message: 'Usuario registrado correctamente',
      user: fullUser,
      token,
    };
  }

  async login(dto: LoginDto) {
    if (!dto.email || dto.email.trim() === '') {
      throw new BadRequestException('El email es requerido');
    }

    //** Validar que la contraseña no esté vacía
    if (!dto.password || dto.password.trim() === '') {
      throw new BadRequestException('La contraseña es requerida');
    }

    //* Buscar el usuario y validar la contraseña
    const user = await this.validateUser(dto.email, dto.password);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }
    const refreshTime = 7 * 24 * 60; //*en minutos
    const tokenTime = 15;
    //* Generar el token JWT
    const accessToken = this.generateToken({
      sub: user.id,
      email: user.email,
      expiresIn: `${tokenTime}m`,
    });

    const refreshToken = this.generateToken({
      sub: user.id,
      email: user.email,
      expiresIn: `${refreshTime}m`,
    });

    await this.redisService.set(
      `refresh:${user.id}`,
      refreshToken,
      refreshTime * 60,
    );
    await this.redisService.set(
      `access:${user.id}`,
      accessToken,
      tokenTime * 60,
    );

    return {
      message: 'Login exitoso',
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async validateUser(email: string, password: string) {
    //* 1. Buscar el perfil por email

    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      return null; //* Si no se encuentra el perfil, retornar null
    }
    //* 2. Verificar si el perfil está activo o eliminado
    if (!user.is_active || user.deleted_at) {
      return null;
    }
    const passwordValid = await this.hashService.compare(
      password,
      user.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas'); //* Lanzar excepción si las contraseñas no coinciden
    }
    return user;
  }
  async refresh(userId: number, email: string, refreshToken: string) {
    const stored = await this.redisService.get<string>(`refresh:${userId}`);

    if (!stored || stored !== refreshToken) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    const newAccessToken = this.generateToken({
      sub: userId,
      email: email,
      expiresIn: '15m',
    });

    return { accessToken: newAccessToken };
  }

  async logout(userId: number, accessToken: string) {
    const decoded: any = this.jwtService.decode(accessToken);
    const ttl = decoded.exp - Math.floor(Date.now() / 1000);

    await this.redisService.set(`bl:${accessToken}`, true, ttl);
    await this.redisService.del(`refresh:${userId}`);
  }

  generateToken(payload: any, expiresIn: number = 3600) {
    return this.jwtService.sign(payload, { expiresIn });
  }
}
