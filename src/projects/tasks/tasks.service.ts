import { CreateTaskDto } from './../dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from '../entities/task.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Project } from '../entities/project.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { GetTaskFilterDto } from '../dto/get-task-filter';
import { TokenData } from 'src/authentication/types/AuthRequest';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  async create(tokenData: TokenData, createTaskDto: CreateTaskDto) {
    const task = new Task(createTaskDto);

    task.user = await this.userRepository.findOne(
      createTaskDto.username
        ? {
            where: {
              username: createTaskDto.username,
            },
          }
        : {
            where: {
              id: tokenData.id,
            },
          },
    );
    task.project = await this.projectRepository.findOne({
      where: {
        id: createTaskDto.projectId,
      },
    });
    await this.tasksRepository.save({ ...task, status: TaskStatus.create });
    return 'Task created successfully';
  }
  async findAll(filters: GetTaskFilterDto, tokenData?: TokenData) {
    let where: FindOptionsWhere<Task> = {};
    if (filters.username || tokenData) {
      where = {
        ...where,
        user: tokenData ? { id: tokenData.id } : { username: filters.username },
      };
    }
    if (filters.projectId) {
      where = { ...where, project: { id: filters.projectId } };
    }

    return this.tasksRepository.find({
      relations: {
        project: true,
      },
      select: {
        user: {
          firstName: true,
          lastName: true,
          username: true,
        },
      },
      where,
      order: {
        startDate: 'DESC',
      },
    });
  }
  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = new Task(updateTaskDto);
    await this.tasksRepository.save({ id, ...task });
    return 'Task updated successfully';
  }
  async remove(id: string) {
    await this.tasksRepository.delete({ id });
    return JSON.stringify('Task deleted successfully');
  }
}
