import express from "express";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../controller/todocontroller.js";
const router=express.Router();
router.post("/todos",addTodo);
router.get("/todos",getTodos);
router.put("/todos/:id",updateTodo);
router.delete("/todos/:id",deleteTodo);
export default router;