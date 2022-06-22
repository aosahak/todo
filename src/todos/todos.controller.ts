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
import { Todo, TodoStatus } from './todo.model';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getTodos(@Query() filtersDto: GetFilteredTodosDto) {
    console.log('filtersDto', filtersDto);

    if (Object.keys(filtersDto).length > 0) {
      console.log('mtav');
      return this.todosService.getFilteredTodos(filtersDto);
    }
    console.log('asd');
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
  updateTodoStatus(@Param('id') id: string, @Body('status') status) {
    return this.todosService.updateTodoStatus(id, status);
  }

  @Delete(':id')
  deleteById(@Param() params) {
    const { id } = params;
    return this.todosService.deleteTodo(id);
  }
}
