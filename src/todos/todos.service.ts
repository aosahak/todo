import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo, TodoStatus } from './todo.model';

import { v4 as uuid } from 'uuid';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetFilteredTodosDto } from './dto/get-filtered-todos.dto';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  getAllTodos() {
    return this.todos;
  }

  getFilteredTodos(filtersDto: GetFilteredTodosDto) {
    const { status, search } = filtersDto;

    let todos = this.getAllTodos();

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

  getTodoById(id: string) {
    const [todo] = this.getTodo(id);

    return todo;
  }

  createTodo(createTodoDto: CreateTodoDto) {
    const { title, description } = createTodoDto;

    const todo: Todo = {
      id: uuid(),
      title,
      description,
      status: TodoStatus.OPEN,
    };

    this.todos.push(todo);

    return todo;
  }

  deleteTodo(id: string) {
    const [todo, idx] = this.getTodo(id);

    this.todos.splice(idx, 1);
  }

  updateTodoStatus(id: string, status: TodoStatus) {
    const [todo, idx] = this.getTodo(id);

    todo.status = status;
  }

  private getTodo(id: string): [Todo, number] {
    const idx = this.todos.findIndex((todo) => todo.id === id);
    const found = this.todos[idx];

    if (found) {
      return [found, idx];
    }

    throw new NotFoundException();
  }
}
