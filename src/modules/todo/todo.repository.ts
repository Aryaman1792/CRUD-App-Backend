import { TodoModel } from "./todo.model";

export class TodoRepository {

  create(data: any) {
    return TodoModel.create(data);
  }

  findAll(filter: any, options: any) {
    return TodoModel.find(filter)
      .skip(options.skip)
      .limit(options.limit)
      .sort(options.sort);
  }

  findById(id: string) {
    return TodoModel.findById(id);
  }

  update(id: string, data: any) {
    return TodoModel.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return TodoModel.findByIdAndDelete(id);
  }
}
