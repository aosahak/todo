import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoStatus } from './todo-status.enum';

import { CreateTodoDto } from './dto/create-todo.dto';
import { GetFilteredTodosDto } from './dto/get-filtered-todos.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async getAllTodos() {
    return await this.todosRepository.find();
  }

  async getFilteredTodos(getFilteredTodosDto: GetFilteredTodosDto) {
    const { status, search } = getFilteredTodosDto;

    const query = await this.todosRepository.createQueryBuilder('todo');

    if (status) {
      query.andWhere('todo.status = :status', {
        status,
      });
    }

    if (search) {
      query.andWhere(
        `LOWER(todo.title) LIKE LOWER(:search) OR LOWER(todo.description) LIKE LOWER(:search)`,
        {
          search: `%${search}%`,
        },
      );
    }

    const todos = query.getMany();

    return todos;
  }

  async getTodoById(id: string) {
    const found = await this.todosRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} does not exist`);
    }

    return found;
  }

  async createTodo(createTodoDto: CreateTodoDto) {
    const { title, description } = createTodoDto;

    const todo: Todo = this.todosRepository.create({
      title,
      description,
      status: TodoStatus.OPEN,
    });

    await this.todosRepository.save(todo);

    return todo;
  }

  async deleteTodo(id: string) {
    const res = await this.todosRepository.delete({ id });

    if (res.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} does not exist`);
    }
  }

  async updateTodoStatus(id: string, status: TodoStatus) {
    const found = await this.getTodoById(id);

    found.status = status;

    this.todosRepository.save(found);

    return found;
  }
}
