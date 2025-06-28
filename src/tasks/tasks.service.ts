import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}
  create(createTaskDto: CreateTaskDto) {
    const task = this.repo.create(createTaskDto);
    return this.repo.save(task);
  }

  findAll() {
    return this.repo.find();
  }
}
