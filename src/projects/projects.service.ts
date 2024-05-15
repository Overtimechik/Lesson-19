import { AddedUserToProjectDTO } from './dto/added-user-to-project.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { GetProjectFilterDto } from './dto/get-project-filter';
import { TokenData } from 'src/authentication/types/AuthRequest';
import { Role, RolesProject } from './entities/role.entity';
import { GetParticipantsResponse } from './responce/get-participants-response';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesProjectRepository: Repository<Role>,
  ) {}
  async create(tokenData: TokenData, createProjectDto: CreateProjectDto) {
    const user = await this.userRepository.findOne({
      where: { id: tokenData.id },
    });
    const project = new Project(createProjectDto);

    await this.projectRepository.save(project);
    await this.rolesProjectRepository.save({
      user,
      project,
      role: RolesProject.admin,
    });

    return JSON.stringify('Проект создан');
  }
  async findParticipants(projectId: string) {
    const users = await this.userRepository.find({
      relations: {
        roles: {
          project: true,
        },
      },
    });
    const particpants: GetParticipantsResponse[] = [];
    for (const user of users) {
      const projectIds = user.roles.map((item) => item.project.id);
      if (projectIds.includes(projectId)) continue;

      particpants.push({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
    return particpants;
  }

  async update(projectId: string, updateProjectDto: UpdateProjectDto) {
    if (updateProjectDto.name) {
      await this.projectRepository.save({
        id: projectId,
        name: updateProjectDto.name,
      });
    }
    for (const userName of updateProjectDto.users) {
      const user = await this.userRepository.findOne({
        where: {
          username: userName,
        },
      });
      const checkUserCreated = await this.rolesProjectRepository.findOne({
        where: {
          user: {
            id: user.id,
          },
          project: {
            id: projectId,
          },
        },
      });
      if (checkUserCreated) continue;

      await this.rolesProjectRepository.save({
        user: { id: user.id },
        project: { id: projectId },
        role: RolesProject.worker,
      });
      return JSON.stringify('Проект обновлен');
    }
  }
  async findMembers(projectId: string) {
    return this.rolesProjectRepository.find({
      where: {
        project: {
          id: projectId,
        },
      },
      relations: {
        user: true,
      },
      select: {
        role: true,
        user: {
          firstName: true,
          username: true,
          lastName: true,
        },
      },
    });
  }
  async addedUserToProject(
    projectId: string,
    tokenData: TokenData,
    dto: AddedUserToProjectDTO,
  ) {
    const user = await this.rolesProjectRepository.findOne({
      where: {
        user: {
          id: tokenData.id,
        },
        project: {
          id: projectId,
        },
      },
    });
    if (user.role !== RolesProject.admin) {
      throw new HttpException(
        'У вас недостаточно прав, что бы добавлять пользователей в проект',
        HttpStatus.CONFLICT,
      );
    }
    const member = await this.userRepository.findOne({
      where: {
        username: dto.username,
      },
    });
    const project = await this.projectRepository.findOne({
      where: {
        id: projectId,
      },
    });
    await this.rolesProjectRepository.save({
      role: dto.role || RolesProject.worker,
      user: member,
      project: project,
    });

    return `Пользователь ${dto.username} добавлен`;
  }
  async findAll(tokenData: TokenData) {
    return this.projectRepository.find({
      where: {
        roles: {
          user: {
            id: tokenData.id,
          },
        },
      },
    });
  }
}
