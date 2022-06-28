import { IsEnum, IsOptional } from 'class-validator';
import { TodoStatus } from '../todo-status.enum';

export class GetFilteredTodosDto {
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @IsOptional()
  search?: string;
}
