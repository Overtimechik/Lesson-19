import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { GetProjectFilterDto } from './dto/get-project-filter';
import { TokenData } from 'src/authentication/types/AuthRequest';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}
  async create(createProjectDto: CreateProjectDto) {
    const project = new Project(createProjectDto);

    await this.projectRepository.save(project);

    return 'This action adds a new project';
  }

  async findAll(tokenData:TokenData) {
    return this.projectRepository.find({
      where:{ roles: {id: tokenData.id }}
    })

  }

}
