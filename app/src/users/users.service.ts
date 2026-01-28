import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        profile: true,
      },
    });
  }

  create(createUserDto: CreateUserDto) {
    const { profile, ...userData } = createUserDto;

    return this.prisma.user.create({
      data: {
        ...userData,
        profile: {
          create: {
            ...profile,
          },
        },
      },
      include: {
        profile: true,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      where: { deleted_at: null },
      include: { profile: true },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const { profile, ...userData } = updateUserDto;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        profile: profile
          ? {
              update: {
                ...profile,
              },
            }
          : undefined,
      },
      include: { profile: true },
    });
  }

  async remove(id: number) {
    const deleted_user = await this.prisma.user.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        is_active: false,
      },
    });

    await this.prisma.profile.updateMany({
      where: { userId: id },
      data: {
        deleted_at: new Date(),
        is_active: false,
      },
    });

    const deleted_profile = await this.prisma.profile.findUnique({
      where: {
        userId: id,
      },
    });

    return {
      message: 'Usuario y perfil eliminados correctamente',
      user: deleted_user,
      profile: deleted_profile,
    };
  }
}
