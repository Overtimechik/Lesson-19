import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTaskFilterDto } from '../dto/get-task-filter';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequest } from 'src/authentication/types/AuthRequest';
import { GetTaskResponse } from '../responce/get-task-responce';
import { UpdateTaskDto } from '../dto/update-task.dto';

@ApiTags('Задачи')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Request() req: AuthRequest, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(req.user, createTaskDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
  @ApiOkResponse({ type: GetTaskResponse })
  @Get()
  findAll(@Query() filters: GetTaskFilterDto) {
    return this.tasksService.findAll(filters);
  }
  @ApiOkResponse({ type: GetTaskResponse })
  @Get(`/my`)
  findMy(@Query() filters: GetTaskFilterDto, @Request() req: AuthRequest) {
    return this.tasksService.findAll(filters, req.user);
  }
}
