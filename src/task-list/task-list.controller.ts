import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { createTaskListDto } from './dto/create-task-list.dto';
import { TaskListService } from './task-list.service';
import { updateTaskListDto } from './dto/update-task-list.dto';

@Controller('task-list')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Get()
  async obtainAll() {
    const data = await this.taskListService.obtainAll();
    return { data };
  }

  @Post()
  async create(@Body() dto: createTaskListDto) {
    const res = await this.taskListService.create(dto);
    return res;
  }

  @Put()
  async update(@Body() dto: updateTaskListDto) {
    const data = await this.taskListService.update(dto);
    return { data };
  }

  @Delete('/:id')
  async remove(@Param('id') id) {
    const data = await this.taskListService.remove(id);
    return { data };
  }
}
