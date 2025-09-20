//here we will crud for todo model
import Todo from "../models/todo.js"
// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { title, dueDate, createdBy } = req.body; 
    const newTodo = new Todo({ title, dueDate, createdBy });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }     
};
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  }catch (error){
    res.status(500).json({ message: error.message });
  }
};
export const getTodoById = async (req, res) => {
    try {           
        const todo=await Todo.findById(req.params.id);
        if (!todo){
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};
export const updateTodo = async (req, res) => {
    try {
        const updateTodo=await Todo.findByIdandUpdate(
            req.params.id,
            req.body,
       
            { new: true }  
             );
        if (!updateTodo){
            return res.status(404).json({ message: "Todo not found" });
        }  
    
        res.status(200).json(updateTodo);
    
    }
    
     catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}
export const deleteTodo = async (req, res) => {
    try {
        const deleteTodo=await Todo.findByIdAndDelete(req.params.id);
        if (!deleteTodo){   
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};