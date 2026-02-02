import { TodoRepository } from "./todo.repository";
import { ApiError } from "../../utils/ApiError";

export class TodoService {
  constructor(private repo = new TodoRepository()) {}

  createTodo(data: any) {
    return this.repo.create(data);
  }

  getTodos(query: any) {
    const {
      page = 1,
      limit = 10,
      completed,
      search
    } = query;

    const filter: any = {};
    if (completed !== undefined) filter.completed = completed === "true";
    if (search) filter.title = { $regex: search, $options: "i" };

    return this.repo.findAll(filter, {
      skip: (+page - 1) * +limit,
      limit: +limit,
      sort: { createdAt: -1 }
    });
  }

  async getTodo(id: string) {
    const todo = await this.repo.findById(id);
    if (!todo) throw new ApiError(404, "Todo not found");
    return todo;
  }

  updateTodo(id: string, data: any) {
    return this.repo.update(id, data);
  }

  deleteTodo(id: string) {
    return this.repo.delete(id);
  }
}
