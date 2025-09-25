import express from "express";
import { 
  createTodo, 
  deleteTodo, 
  getTodos, 
  updateTodo, 
  getTodoById 
} from "../controller/todocontroller.js";

const router = express.Router();

// Routes
router.post("/todos", createTodo);
router.get("/todos", getTodos);
router.get("/todos/:id", getTodoById); // <-- add single todo route
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;
