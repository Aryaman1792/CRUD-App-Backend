import { model } from "mongoose";
import { TodoSchema } from "./todo.schema";

export const TodoModel = model("Todo", TodoSchema);
