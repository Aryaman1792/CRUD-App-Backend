import { Request, Response, NextFunction } from "express";
import { TodoService } from "./todo.service";

export class TodoController {
  private service = new TodoService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await this.service.createTodo(req.body);
      res.status(201).json(todo);
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = await this.service.getTodos(req.query);
      res.json(todos);
    } catch (err) {
      next(err);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const todo = await this.service.getTodo(id);
      res.json(todo);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const todo = await this.service.updateTodo(id, req.body);
      res.json(todo);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await this.service.deleteTodo(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
