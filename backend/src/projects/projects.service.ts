import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateProjectDto) {
    const project = await this.prisma.project.create({
      data: {
        ...data,
        ownerId: userId,
        status: data.status || 'active',
      },
      include: {
        columns: {
          include: {
            tasks: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Calcular tasks e progress
    const totalTasks = project.columns.reduce(
      (sum, col) => sum + col.tasks.length,
      0,
    );
    const completedTasks = project.columns
      .find((col) => col.title.toLowerCase().includes('concluído'))
      ?.tasks.length || 0;
    const progress =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      ...project,
      tasks: totalTasks,
      progress,
    };
  }

  async findAll(userId: string) {
    const projects = await this.prisma.project.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { userId } } },
        ],
      },
      include: {
        columns: {
          include: {
            tasks: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return projects.map((project) => {
      const totalTasks = project.columns.reduce(
        (sum, col) => sum + col.tasks.length,
        0,
      );
      const completedTasks =
        project.columns.find((col) =>
          col.title.toLowerCase().includes('concluído'),
        )?.tasks.length || 0;
      const progress =
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      return {
        ...project,
        tasks: totalTasks,
        progress,
        members: project.members.map((m) => {
          const name = m.user.name;
          const parts = name.split(' ');
          if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
          }
          return name.substring(0, 2).toUpperCase();
        }),
      };
    });
  }

  async findOne(id: string, userId: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id,
        OR: [
          { ownerId: userId },
          { members: { some: { userId } } },
        ],
      },
      include: {
        columns: {
          include: {
            tasks: {
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    const totalTasks = project.columns.reduce(
      (sum, col) => sum + col.tasks.length,
      0,
    );
    const completedTasks =
      project.columns.find((col) =>
        col.title.toLowerCase().includes('concluído'),
      )?.tasks.length || 0;
    const progress =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      ...project,
      tasks: totalTasks,
      progress,
    };
  }

  async update(id: string, userId: string, data: UpdateProjectDto) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    if (project.ownerId !== userId) {
      throw new ForbiddenException('Você não tem permissão para editar este projeto');
    }

    const updated = await this.prisma.project.update({
      where: { id },
      data,
      include: {
        columns: {
          include: {
            tasks: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    const totalTasks = updated.columns.reduce(
      (sum, col) => sum + col.tasks.length,
      0,
    );
    const completedTasks =
      updated.columns.find((col) =>
        col.title.toLowerCase().includes('concluído'),
      )?.tasks.length || 0;
    const progress =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      ...updated,
      tasks: totalTasks,
      progress,
    };
  }

  async remove(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    if (project.ownerId !== userId) {
      throw new ForbiddenException('Você não tem permissão para excluir este projeto');
    }

    await this.prisma.project.delete({
      where: { id },
    });

    return { message: 'Projeto excluído com sucesso' };
  }
}
