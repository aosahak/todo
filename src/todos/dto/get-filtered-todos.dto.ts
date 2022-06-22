import { TodoStatus } from '../todo.model';

export class GetFilteredTodosDto {
  status?: TodoStatus;
  search?: string;
}
