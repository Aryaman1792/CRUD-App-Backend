import express from "express";
import mongoose from "mongoose";
import todoRoutes from "./modules/todo/todo.routes";
import { errorHandler } from "./middlewares/error.middleware";

export class App {
  app = express();
  PORT = 4000;

  constructor() {
    this.init();
  }

  async init() {
    this.app.use(express.json());
    this.app.use("/api/todos", todoRoutes);
    this.app.use(errorHandler);

    await mongoose.connect("mongodb://127.0.0.1:27017/todo-oop");
    console.log("Database connected successfully");

    this.app.listen(this.PORT, () =>
      console.log("Server running on port", this.PORT)
    );
  }
}
