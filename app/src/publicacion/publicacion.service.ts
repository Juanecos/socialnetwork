import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class PublicacionService {
  constructor(private prisma: PrismaService) {}

  async create(createPublicacionDto: CreatePublicacionDto) {
    if (!createPublicacionDto.title || !createPublicacionDto.userId) {
      throw new BadRequestException('El titulo y el usuario son obligatorios');
    }
    const user = await this.prisma.user.findUnique({
      where: { id: createPublicacionDto.userId },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con id ${createPublicacionDto.userId} no encontrado`);
    }
    

    let publishedAt: Date;
    if (createPublicacionDto.published_date) {
      const parsedDate = new Date(createPublicacionDto.published_date);
      if (isNaN(parsedDate.getTime())) {
        throw new BadRequestException('La fecha de publicación no tiene un formato válido');
      }
      publishedAt = parsedDate;
    } else {
      // Si no se pasa una fecha, asigna la fecha actual
      publishedAt = new Date();
    }

    return this.prisma.publicacion.create({
      data: {
        title: createPublicacionDto.title,
        content: createPublicacionDto.content,
        published: createPublicacionDto.published,
        userId: createPublicacionDto.userId,
        published_date: publishedAt
      },
    });
  }

  async findAll() {
    return this.prisma.publicacion.findMany({
      include: {
        user: {
          select: {
            email: true,
            profile: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }
  async findOne(id: number) {
    return this.prisma.publicacion.findUnique({
      where: { id },
    });
  }

  async findUserPublicaciones(userId: number) {
    if (!userId) {
      throw new BadRequestException('El usuario es obligatorio');
    }
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
    }
    return this.prisma.publicacion.findMany({
      where: { userId },
    });
  }

  async update(id: number, updatePublicacionDto: UpdatePublicacionDto) {
    if (!id) {
      throw new BadRequestException('El id es obligatorio');
    }
    const publicacion = await this.prisma.publicacion.findUnique({
      where: { id },
    });
    if (!publicacion) {
      throw new NotFoundException(`Publicacion con id ${id} no encontrada`);
    }
    return this.prisma.publicacion.update({
      where: { id },
      data: updatePublicacionDto,
    });
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException('El id es obligatorio');
    }
    const publicacion = await this.prisma.publicacion.findUnique({
      where: { id },
    });
    if (!publicacion) {
      throw new NotFoundException(`Publicacion con id ${id} no encontrada`);
    }
    return this.prisma.publicacion.delete({
      where: { id },
    });
  }
}


