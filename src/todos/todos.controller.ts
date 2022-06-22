import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetFilteredTodosDto } from './dto/get-filtered-todos.dto';
import { UpdateTodoStatusDto } from './dto/update-todo-status.dto';
import { Todo, TodoStatus } from './todo.model';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getTodos(@Query() getFilteredTodosDto: GetFilteredTodosDto) {
    if (Object.keys(getFilteredTodosDto).length > 0) {
      return this.todosService.getFilteredTodos(getFilteredTodosDto);
    }
    return this.todosService.getAllTodos();
  }

  @Get(':id')
  getTodoById(@Param() params) {
    const { id } = params;
    return this.todosService.getTodoById(id);
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.createTodo(createTodoDto);
  }

  @Patch(':id/status')
  updateTodoStatus(
    @Param('id') id: string,
    @Body() updateTodoStatusDto: UpdateTodoStatusDto,
  ) {
    const { status } = updateTodoStatusDto;
    return this.todosService.updateTodoStatus(id, status);
  }

  @Delete(':id')
  deleteById(@Param() params) {
    const { id } = params;
    return this.todosService.deleteTodo(id);
  }
}
