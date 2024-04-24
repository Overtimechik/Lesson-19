import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetProjectFilterDto } from './dto/get-project-filter';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request} from '@nestjs/common';
import { AuthRequest } from 'src/authentication/types/AuthRequest';
import { GetProjectFindAllResponse } from 'src/profile/response/get-project-find-all.response';

@ApiTags("Проекты")
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @Request() req:AuthRequest,
    @Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(req.user, createProjectDto);
  }

  @ApiOkResponse({type:GetProjectFindAllResponse})
  @Get()
  findAll(@Request() req: AuthRequest){
    return this.projectsService.findAll(req.user);
  }

}
