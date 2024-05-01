import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { GetProjectFilterDto } from './dto/get-project-filter';
import { TokenData } from 'src/authentication/types/AuthRequest';
import { Role, RolesProject } from './entities/role.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesProjectRepository: Repository<Role>
  ){}
  async create( tokenData: TokenData, createProjectDto: CreateProjectDto){
    const user = await this.userRepository.findOne({
      where: {id: tokenData.id},
    })
    const project = new Project(createProjectDto);

    await this.projectRepository.save(project);
    await this.rolesProjectRepository.save({
      user,
      project,
      role:RolesProject.admin
    })

    return  JSON.stringify('Проект создан');
  }
  async findParticipants(projectId:string){
    return this.rolesProjectRepository.find({
      where: {
        project:{
          id:projectId
        }
      },
      relations:{
        user: true
      },
      select:{
        role:true,
        user:{
          firstName:true,
          username:true,
          lastName:true
        }
      }
    })
  }
  async findAll(tokenData:TokenData) {
    return this.projectRepository.find({
      where:{ roles:{
        user: {
          id: tokenData.id,
        }
      }}
    })

  }

}
