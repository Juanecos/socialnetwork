import { Injectable } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class PublicacionService {
  constructor(private prisma: PrismaService) {}

  // Crear una nueva publicación
  async create(createPublicacionDto: CreatePublicacionDto, userId: number) {
    return this.prisma.publicacion.create({
      data: {
        ...createPublicacionDto,
        userId, // Asignamos el userId (ya que la publicación está asociada a un usuario)
      },
    });
  }

  // Obtener todas las publicaciones de un usuario
  async findAll(userId: number) {
    return this.prisma.publicacion.findMany({
      where: { userId },
    });
  }

  // Obtener una publicación por ID
  async findOne(id: number) {
    return this.prisma.publicacion.findUnique({
      where: { id },
    });
  }

  // Actualizar una publicación
  async update(id: number, updatePublicacionDto: UpdatePublicacionDto) {
    return this.prisma.publicacion.update({
      where: { id },
      data: updatePublicacionDto,
    });
  }

  // Eliminar una publicación
  async remove(id: number) {
    return this.prisma.publicacion.delete({
      where: { id },
    });
  }
}


