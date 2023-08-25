import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async obtainByList(@Param('id') id) {
    const data = await this.taskService.obtainByList(id);
    return { data };
  }

  @Post()
  async create(@Body() dto: createTaskDto) {
    const data = await this.taskService.create(dto);
    return data;
  }

  @Put()
  async update(@Body() dto: updateTaskDto) {
    const data = await this.taskService.update(dto);
    return { data };
  }

  @Delete('/:id')
  async remove(@Param('id') id) {
    const data = await this.taskService.remove(id);
    return { data };
  }
}
