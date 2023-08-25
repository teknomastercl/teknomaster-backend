import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';
import { errorSend } from 'src/utils/errorSend';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async obtainByList(id) {
    const res = await this.taskRepository.find({
      where: { taskList: id },
    });
    if (!res) {
      return errorSend(1, 'Error al buscar');
    }
    return { data: res };
  }

  async create(dto: createTaskDto) {
    const newItem = new Task();
    newItem.title = dto.title;
    newItem.note = dto.note;
    newItem.date = dto.date;
    newItem.time = dto.time;
    newItem.customer = dto.customer;
    newItem.user = dto.user;
    newItem.prority = dto.prority;
    newItem.points = dto.points;
    newItem.taskList = dto.taskList;
    newItem.taskStatus = dto.taskStatus;

    const res = await this.taskRepository.save(newItem);
    if (!res) {
      return errorSend(1, 'Error al crear una tarea');
    }
    return { data: res };
  }

  async update(dto: updateTaskDto) {
    const toUpdate = await this.taskRepository.findOne(dto.id);
    if (!toUpdate) {
      return errorSend(1, 'El ID de tarea no existe');
    }
    toUpdate.title = dto.title;
    toUpdate.note = dto.note;
    toUpdate.date = dto.date;
    toUpdate.time = dto.time;
    toUpdate.customer = dto.customer;
    toUpdate.user = dto.user;
    toUpdate.prority = dto.prority;
    toUpdate.points = dto.points;
    toUpdate.taskList = dto.taskList;
    toUpdate.taskStatus = dto.taskStatus;
    const res = await this.taskRepository.save(toUpdate);
    return res;
  }
  async remove(id) {
    const finder = await this.taskRepository.findOne(id);
    if (!finder) {
      return errorSend(1, 'El ID de tarea no existe');
    }
    const res = await this.taskRepository.remove(finder);
    return res;
  }
}
