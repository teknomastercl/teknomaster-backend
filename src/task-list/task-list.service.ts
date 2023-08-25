import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskList } from './task-list.entity';
import { Repository } from 'typeorm';
import { createTaskListDto } from './dto/create-task-list.dto';
import { errorSend } from 'src/utils/errorSend';
import { updateTaskListDto } from './dto/update-task-list.dto';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskRepository: Repository<TaskList>,
  ) {}

  async obtainAll() {
    const res = this.taskRepository.find();
    return res;
  }

  async create(dto: createTaskListDto) {
    const newItem = new TaskList();
    newItem.title = dto.title;

    const res = await this.taskRepository.save(newItem);
    if (!res) {
      return errorSend(1, 'Error al crear una lista');
    }
    return { data: res };
  }

  async update(dto: updateTaskListDto) {
    const toUpdate = await this.taskRepository.findOne(dto.id);
    if (!toUpdate) {
      return errorSend(1, 'El ID de la lista no existe');
    }
    toUpdate.title = dto.title;
    const res = await this.taskRepository.save(toUpdate);
    return res;
  }
  async remove(id) {
    const finder = await this.taskRepository.findOne(id);
    if (!finder) {
      return errorSend(1, 'El ID de la lista no existe');
    }
    const res = await this.taskRepository.remove(finder);
    return res;
  }
}
