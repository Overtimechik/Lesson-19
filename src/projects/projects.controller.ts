import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetProjectFilterDto } from './dto/get-project-filter';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from '@nestjs/common';
import { AuthRequest } from 'src/authentication/types/AuthRequest';
import { GetProjectFindAllResponse } from 'src/profile/response/get-project-find-all.response';
import { GetParticipantsResponse } from './responce/get-participants-response';
import { GetMembersResponse } from './responce/get-members-response';
import { AddedUserToProjectDTO } from './dto/added-user-to-project.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('Проекты')
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @Request() req: AuthRequest,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(req.user, createProjectDto);
  }

  @ApiOkResponse({ type: GetProjectFindAllResponse })
  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.projectsService.findAll(req.user);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }
  @Patch(':id/role')
  updateRole(
    @Request() req: AuthRequest,
    @Param(':id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.projectsService.updateRole(id, updateRoleDto, req.user);
  }
  @Delete(':id/user')
  removeRole(
    @Request() req: AuthRequest,
    @Param(':id') id: string,
    @Body() username: string,
  ) {
    return this.projectsService.deleteRole(id, username, req.user);
  }

  @ApiOkResponse({ type: GetParticipantsResponse })
  @Get(':id/participants')
  findParticipants(@Param('id') id: string) {
    return this.projectsService.findParticipants(id);
  }
  @ApiOkResponse({ type: GetMembersResponse })
  @Get(':id/members')
  findMembers(@Param('id') id: string) {
    return this.projectsService.findMembers(id);
  }

  @Post(':id/members')
  addedUserToProject(
    @Param('id') id: string,
    @Request() req: AuthRequest,
    @Body() dto: AddedUserToProjectDTO,
  ) {
    return this.projectsService.addedUserToProject(id, req.user, dto);
  }
}
