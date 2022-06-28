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

  // getAllTodos() {
  //   return this.todos;
  // }

  // getFilteredTodos(getFilteredTodosDto: GetFilteredTodosDto) {
  //   const { status, search } = getFilteredTodosDto;

  //   let todos = this.getAllTodos();

  //   if (status) {
  //     todos = todos.filter((todo) => todo.status === status);
  //   }

  //   if (search) {
  //     todos = todos.filter(
  //       (todo) =>
  //         todo.title.toLowerCase().includes(search.toLowerCase()) ||
  //         todo.description.toLowerCase().includes(search.toLowerCase()),
  //     );
  //   }

  //   return todos;
  // }

  async getTodoById(id: string) {
    const found = await this.todosRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} does not exist`);
    }

    return found;
  }

  // createTodo(createTodoDto: CreateTodoDto) {
  //   const { title, description } = createTodoDto;

  //   const todo: TodoModel = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TodoStatus.OPEN,
  //   };

  //   this.todos.push(todo);

  //   return todo;
  // }

  // deleteTodo(id: string) {
  //   const found = this.getTodoById(id);

  //   this.todos = this.todos.filter((todo) => todo.id !== found.id);
  // }

  // updateTodoStatus(id: string, status: TodoStatus) {
  //   const found = this.getTodoById(id);

  //   found.status = status;

  //   return found;
  // }
}
