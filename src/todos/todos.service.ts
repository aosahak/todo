import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoStatus } from './todo-status.enum';

import { v4 as uuid } from 'uuid';
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

    let todos = await this.getAllTodos();

    if (status) {
      todos = todos.filter((todo) => todo.status === status);
    }

    if (search) {
      todos = todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(search.toLowerCase()) ||
          todo.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

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
    const found = await this.getTodoById(id);

    await this.todosRepository.delete(found);
  }

  async updateTodoStatus(id: string, status: TodoStatus) {
    const found = await this.getTodoById(id);

    found.status = status;

    this.todosRepository.save(found);

    return found;
  }
}
