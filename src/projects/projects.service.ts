import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { GetProjectFilterDto } from './dto/get-project-filter';

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

  async findAll(filters:GetProjectFilterDto) {
    let where: FindOptionsWhere<Project> = {}
    if(filters.userId){
      where = {...where,users:{id: filters.userId}}
    }
    return this.projectRepository.find({where});

  }

  async findOne(id: string) {
    return this.projectRepository.findOne({
      where: {id},
      relations: {
        users:true,
      }
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = new Project(updateProjectDto);

    if (updateProjectDto?.userId){
    const user = await this.userRepository.findOneBy({
        id: updateProjectDto.userId,
      })
      project.users = [...(project.users ?? []), user]
    }
    await this.projectRepository.save({id , ...project})
    return 'Проект обновлен'
  }

  async remove(id: string) {
    await this.projectRepository.delete({id});
    return `This action removes a #${id} project`;
  }
}
