import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTaskFilterDto } from '../dto/get-task-filter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Задачи")
@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService:TasksService

        ){}

        @Post()
        create(@Body() createTaskDto:CreateTaskDto){
            return this.tasksService.create(createTaskDto);

        }


        @Patch(":id")
        update(@Param("id") id:string, @Body() updateTaskDto:CreateTaskDto){
            return this.tasksService.update(id, updateTaskDto);
        }

        @Delete(":id")
        remove(@Param("id") id:string){
        return this.tasksService.remove(id);
        }
        @Get()
        findAll(@Query() filters: GetTaskFilterDto){
            return this.tasksService.findAll(filters);
        }
            
}
