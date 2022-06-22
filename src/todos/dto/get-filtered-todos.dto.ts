import { IsEnum, IsOptional } from 'class-validator';
import { TodoStatus } from '../todo.model';

export class GetFilteredTodosDto {
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @IsOptional()
  search?: string;
}
