import express from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controller/todocontroller.js";

const router = express.Router();

router.post("/todos", createTodo);
router.get("/todos", getTodos);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;   
